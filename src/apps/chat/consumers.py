# -*- coding: utf-8 -*-
from json import loads, dumps
from datetime import datetime

from channels import Group
# from channels.sessions import enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http

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
    # ToDo: messageはredisで管理
    text = loads(message.content['text'])
    method = text['method']

    if method == 'GET':
        messages = []
    elif method == 'POST':
        message = {
            'content': text['content'],
            'dest_message': text.get('dest_message'),
            'chat_user': user_id,
            'chat_room': room_id,
            'created_by': user_id,
            'created_at': datetime.now()
        }
        messages = []
        messages.append(message)
    elif method == 'PUT':
        pass
    elif method == 'DELETE':
        pass
    else:
        return

    Group(room_id).send({'text': dumps(messages, default=datetime_default)})


@channel_session_user
def disconnect(message, room_id):
    Group(room_id).discard(message.reply_channel)
