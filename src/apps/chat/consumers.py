# -*- coding: utf-8 -*-
import json
from datetime import datetime

from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')


@channel_session_user_from_http
def connect(message, label):
    # ToDo: Roomとの紐付け処理
    message.reply_channel.send({'accept': True})
    Group(label).add(message.reply_channel)


@channel_session_user
def receive(message, label):
    # ToDo: message保存処理
    Group(label).send({
        'text': json.dumps({
            'user': message.user.username,
            'time': datetime.now(),
            'message': message.content['text'],
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
