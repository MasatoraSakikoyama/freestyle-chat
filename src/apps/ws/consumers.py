# -*- coding: utf-8 -*-
from channels import Group
from channels.sessions import channel_session


def _getGroup(message):
    return Group('chat-{}'.format(message.channel_session['room']))


@channel_session
def ws_connect(message):
    message.reply_channel.send({'accept': True})
    message.channel_session['room'] = message.content['path'].strip('/')
    _getGroup(message).add(message.reply_channel)


@channel_session
def ws_receive(message):
    _getGroup(message).send({
        'text': '[User] {}'.format(message.content['text']),
    })


@channel_session
def ws_disconnect(message):
    _getGroup(message).discard(message.reply_channel)
