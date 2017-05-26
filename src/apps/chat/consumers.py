# -*- coding: utf-8 -*-
from json import loads, dumps
from datetime import datetime

from channels import Group
# from channels.sessions import enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from django.core.cache import caches

from .utils import get_user_id, datetime_default


@channel_session_user_from_http
def connect(message, room_id):
    # ToDo: user room relationはhttpで管理する
    # room = Room.objects.get(room_id=room_id)
    # if not UserRoomRelation.objects.filter(
    #     chat_user=user,
    #     chat_room=room,
    # ).exists():
    #     UserRoomRelation.objects.create(
    #         handle_name=user.name,
    #         role=ROLE_CHOICES[0][0],
    #         chat_user=user,
    #         chat_room=room,
    #         created_by=user.user_id,
    #         modified_by=user.user_id,
    #     )

    message.reply_channel.send({'accept': True})
    Group(room_id).add(message.reply_channel)


@channel_session_user
# @enforce_ordering
@get_user_id
def receive(message, room_id, user_id):
    text = loads(message.content['text'])
    method = text['method']
    cache = caches['messages']

    if method == 'POST':
        now = datetime.now()
        message_id = '{}_{}_{}'.format(room_id, user_id, now)
        target = {
            'id': message_id,
            'content': text['content'],
            'dest_message': text.get('dest_message'),
            'chat_user': user_id,
            'chat_room': room_id,
            'created_by': user_id,
            'created_at': now,
            'modified_by': user_id,
            'modified_at': now,
        }
        if cache.add(message_id, target, timeout=None):
            message = target
        else:
            message = 'fail post message'

    elif method == 'PUT':
        after = text['message']
        after.modified_by = user_id
        after.modified_at = datetime.now()
        with cache.lock(after.id):
            before = cache.get(after.id)
            before.update(after)
            cache.set(before.id, before)
        message = before

    elif method == 'DELETE':
        message = text['message']
        with cache.lock(message.id):
            cache.delete(message.id)
        message = 'success delete message'

    else:
        return

    Group(room_id).send({'text': dumps(message, default=datetime_default)})


@channel_session_user
def disconnect(message, room_id):
    Group(room_id).discard(message.reply_channel)
