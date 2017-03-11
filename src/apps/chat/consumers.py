# -*- coding: utf-8 -*-
import json
from datetime import datetime
from functools import wraps

from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http

from apps.orm.models import User, Room, UserRoomRelation, Message


def get_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if args[0].user.is_anonymous:
            user = User.objects.get(pk=0)  # dummy user
        else:
            user = User.objects.get(pk=message.user.pk)
        kwargs['user'] = user
        return func(*args, **kwargs)
    return wrapper


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')


@channel_session_user_from_http
@get_user
def connect(message, label, user):
    room = Room.objects.get(label=label)
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
            create_by=user.pk,
        )

    message.reply_channel.send({'accept': True})
    Group(label).add(message.reply_channel)


@channel_session_user
@get_user
def receive(message, label, user):
    room = Room.objects.get(label=label)
    text = message.content['text']
    method = text.get('method')
    if method == 'POST':
        Message.objects.create(
            content=text.get('content'),
            dest_message=text.get('dest_message'),
            chat_user=user,
            chat_room=room,
            create_by=user.pk
        )
    elif method == 'PUT':
        message = Message.objects.get(pk=text['message_id'])
        message.contnt = text.get('content')
        message.dest_message = text.get('dest_message')
        message.modified_by=user.pk
        message.save()
    elif method == 'DELETE':
        message = Message.objects.get(pk=text['message_id'])
        message.deleted_by = user.pk
        message.deleted_at = datetime.now()
        message.save()
    else:
        return

    Group(label).send({
        'text': json.dumps({
            'user': user.name,
            'time': datetime.now(),
            'message': text.content,
        }, default=datetime_default)
    })


@channel_session_user
def disconnect(message, label):
    Group(label).discard(message.reply_channel)


def message_send(message, label):
    Group(label).send({
        'text': json.dumps({
            'user': message.user.username,
            'time': datetime.now(),
            'message': message.content['text'],
        }, default=datetime_default)
    })
