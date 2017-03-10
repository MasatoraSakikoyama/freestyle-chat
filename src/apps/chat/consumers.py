# -*- coding: utf-8 -*-
import json
import haikunator
from datetime import datetime
from functools import wraps

from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http


def id_generator(func):
    def _generate_id():
        return haikunator.haikunate()

    @wraps(func)
    def wrapper(*args, **kwargs):
        if kwargs.get('label') == 'create':
            kwargs['label'] = _generate_id()
        return func(*args, **kwargs)
    return wrapper


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')


@channel_session_user_from_http
def connect(message, label):
    message.reply_channel.send({'accept': True})
    Group(label).add(message.reply_channel)


@channel_session_user
def receive(message, label):
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
