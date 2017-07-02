# -*- coding: utf-8 -*-
from json import loads, dumps
from datetime import datetime

from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http
from django.conf import settings
from django.shortcuts import get_object_or_404
from django_redis import get_redis_connection

from .utils import get_user, get_user_id, datetime_default
from apps.orm.models import Room, UserRoomRelation


@channel_session_user_from_http
@get_user
def connect(message, room_id, user):
    room = get_object_or_404(
        Room,
        room_id=room_id,
        deleted_by='',
        deleted_at=None,
    )
    if room.is_private and not UserRoomRelation.objects.filter(
        chat_user=user,
        chat_room=room,
    ).exists():
        accept = False
    else:
        accept = True

    message.reply_channel.send({'accept': accept})
    Group(room_id).add(message.reply_channel)


@channel_session_user
@get_user_id
def receive(message, room_id, user_id):
    text = loads(message.content['text'])
    method = text['method']
    connection = get_redis_connection(settings.REDIS_DB_NAME)

    if method == 'POST':
        now = datetime.now()
        message = {
            'content': text['content'],
            'dest_message': text.get('dest_message'),
            'chat_user': user_id,
            'chat_room': room_id,
            'created_by': user_id,
            'created_at': now,
            'modified_by': user_id,
            'modified_at': now,
        }
        if connection.get(room_id):
            with connection.lock(room_id):
                message['index'] = connection.llen(room_id)
                connection.rpush(room_id, message)
        else:
            message['index'] = 0
            connection.rpush(room_id, message)
    elif method == 'PUT':
        src = text['message']
        src.modified_by = user_id
        src.modified_at = datetime.now()
        with connection.lock(room_id):
            message = connection.lindex(room_id, src.index)
            message.update(src)
            connection.lset(room_id, message.index, message)
    elif method == 'DELETE':
        with connection.lock(room_id):
            connection.rrem(room_id, 0, text['message'])
        message = 'success delete message'
    else:
        return

    Group(room_id).send({'text': dumps(message, default=datetime_default)})


@channel_session_user
def disconnect(message, room_id):
    Group(room_id).discard(message.reply_channel)
