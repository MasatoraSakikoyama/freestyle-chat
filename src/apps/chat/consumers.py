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
    messages = []

    if method == 'GET':
        keys = cache.keys('message_{}_*'.format(user_id))
        messages.extend(cache.get_many(keys).values())

    elif method == 'POST':
        now = datetime.now()
        key = '{}_{}_{}'.format(room_id, user_id, now)
        message = {
            'message_id': key,
            'content': text['content'],
            'dest_message': text.get('dest_message'),
            'chat_user': user_id,
            'chat_room': room_id,
            'created_by': user_id,
            'created_at': now,
            'modified_by': user_id,
            'modified_at': now,
        }
        if cache.add(key, message):
            messages.append(message)
        else:
            messages.append({
                'message': 'fail post message'
            })

    elif method == 'PUT':
        after = text['message']
        after.modified_by = user_id
        after.modified_at = datetime.now()
        with cache.lock(after.message_id):
            before = cache.get(after.message_id)
            before.update(after)
            cache.set(before.message_id, before)
        messages.append(before)

    elif method == 'DELETE':
        message = text['message']
        with cache.lock(message.message_id):
            cache.delete(message.message_id)
        messages.append({
            'message': 'success delete message'
        })

    else:
        return

    Group(room_id).send({'text': dumps(messages, default=datetime_default)})


@channel_session_user
def disconnect(message, room_id):
    Group(room_id).discard(message.reply_channel)
