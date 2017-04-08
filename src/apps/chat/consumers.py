# -*- coding: utf-8 -*-
from json import loads, dumps
from datetime import datetime

from channels import Group
from channels.sessions import enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from channels.binding.websockets import WebsocketBinding
from channels.generic.websockets import WebsocketDemultiplexer

from apps.orm.consts import ROLE_CHOICES
from apps.orm.models import Room, UserRoomRelation, Message
from .utils import get_user, datetime_default


@channel_session_user_from_http
@get_user
def connect(message, room_id, user):
    room = Room.objects.get(room_id=room_id)
    if not UserRoomRelation.objects.filter(
        chat_user=user,
        chat_room=room,
    ).exists():
        UserRoomRelation.objects.create(
            handle_name=user.name,
            role=ROLE_CHOICES[0][0],
            chat_user=user,
            chat_room=room,
            created_by=user.user_id,
            modified_by=user.user_id,
        )

    message.reply_channel.send({'accept': True})
    Group(room_id).add(message.reply_channel)


@channel_session_user
# @enforce_ordering
@get_user
def receive(message, room_id, user):
    room = Room.objects.get(room_id=room_id)
    text = loads(message.content['text'])
    method = text['method']

    if method == 'GET':
        # messages = Message.objects.filter(chat_room=room).order_by('-created_at')[0:10]
        messages = Message.objects.filter(chat_room=room).order_by('-created_at')
        messages = [m.to_dict() for m in messages]
        messages.reverse()
    elif method == 'POST':
        messages = [Message.objects.create(
            content=text['content'],
            dest_message=text.get('dest_message'),
            chat_user=user,
            chat_room=room,
            created_by=user.user_id,
            modified_by=user.user_id,
        ).to_dict()]
    elif method == 'PUT':
        message = Message.objects.get(pk=text['message_id'])
        message.contnt = text['content']
        message.dest_message = text.get('dest_message')
        message.modified_by = user.user_id
        message.save()
        messages = [message.to_dict()]
    elif method == 'DELETE':
        message = Message.objects.get(pk=text['message_id'])
        message.deleted_by = user.user_id
        message.deleted_at = datetime.now()
        message.save()
        messages = []
    else:
        return

    Group(room_id).send({'text': dumps(messages, default=datetime_default)})


@channel_session_user
@get_user
def disconnect(message, room_id, user):
    Group(room_id).discard(message.reply_channel)


# class MessageBinding(WebsocketBinding):
#     channel_session_user = True
#     channel_session = True
#     strict_ordering = True
#     slight_ordering = True
# 
#     model = Message
#     fields = ['__all__']
# 
#     def get_handler(self, *args, **kwargs):
#         handler = super().get_handler(*args, **kwargs)
#         return get_user(handler)
# 
#     @classmethod
#     def group_names(cls, instance):
#         return [instance.room_id]
# 
#     def has_permission(self, action, pk, data):
#         return True
# 
# 
# class Demultiplexer(WebsocketDemultiplexer):
#     consumers = {
#         'message': MessageBinding.consumer,
#     }
# 
#     def conenction_groups(self):
#         return [self.room_id]
