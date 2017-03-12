# -*- coding: utf-8 -*-
import json
from datetime import datetime
from functools import wraps

from channels import Group
from channels.sessions import enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http

from apps.orm.models import User, Room, UserRoomRelation, Message


def get_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if args[0].user.is_anonymous:
            user = User.objects.get(pk=0)  # dummy user
        else:
            user = User.objects.get(user_id=args[0].user.user_id)
        kwargs['user'] = user
        return func(*args, **kwargs)
    return wrapper


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')


@channel_session_user_from_http
@get_user
def connect(message, room_id, user):
    room = Room.objects.get(room_id=room_id)
    text = message.content['text']
    try:
        UserRoomRelation.objects.get(
            chat_user=user,
            chat_room=room,
        )
    except UserRoomRelation.DoseNotExist:
        UserRoomRelation.objects.create(
            handle_name=text.get('handle_name'),
            role=text.get('role'),
            chat_user=user,
            chat_room=room,
            created_by=user.user_id,
            modified_by=user.user_id,
        )

    message.reply_channel.send({'accept': True})
    Group(room_id).add(message.reply_channel)


@enforce_ordering
@channel_session_user
@get_user
def receive(message, room_id, user):
    room = Room.objects.get(room_id=room_id)
    text = message.content['text']
    method = text.get('method')
    if method == 'POST':
        Message.objects.create(
            content=text.get('content'),
            dest_message=text.get('dest_message'),
            chat_user=user,
            chat_room=room,
            created_by=user.user_id,
            modified_by=user.user_id,
        )
    elif method == 'PUT':
        message = Message.objects.get(pk=text['message_id'])
        message.contnt = text.get('content')
        message.dest_message = text.get('dest_message')
        message.modified_by = user.user_id
        message.save()
    elif method == 'DELETE':
        message = Message.objects.get(pk=text['message_id'])
        message.deleted_by = user.user_id
        message.deleted_at = datetime.now()
        message.save()
    else:
        return

    Group(room_id).send({
        'text': json.dumps({
            'user': user.name,
            'time': datetime.now(),
            'message': text.content,
        }, default=datetime_default)
    })


@channel_session_user
@get_user
def disconnect(message, room_id, user):
    Group(room_id).discard(message.reply_channel)


def message_send(message, room_id):
    Group(room_id).send({
        'text': json.dumps({
            'user': message.user.username,
            'time': datetime.now(),
            'message': message.content['text'],
        }, default=datetime_default)
    })
