# -*- coding: utf-8 -*-
import json
from datetime import datetime

from channels import Group
from channels.sessions import channel_session


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')



@channel_session
def ws_connect(message):
    message.reply_channel.send({'accept': True})
    message.channel_session['room'] = message.content['path'].strip('/')
    Group('chat-{}'.format(message.channel_session['room'])).add(message.reply_channel)


@channel_session
def ws_receive(message):
    Group('chat-{}'.format(message.channel_session['room'])).send({
        'text': json.dumps({
            'user': 'waiting for auth tutorial',
            'time': datetime.now(),
            'message': message.content['text'],
        }, default=datetime_default)
    })


@channel_session
def ws_disconnect(message):
    Group('chat-{}'.format(message.channel_session['room'])).discard(message.reply_channel)
