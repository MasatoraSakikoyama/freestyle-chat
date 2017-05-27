# -*- coding: utf-8 -*-
from django.db.models import (
    Model,
    CharField,
    PositiveSmallIntegerField,
    DateTimeField,
    BooleanField,
    ForeignKey,
    # OneToOneField,
    ManyToManyField,
    CASCADE,
)

from apps.session.models import User
from django.conf import settings


class BaseModel(Model):
    created_by = CharField(max_length=255, blank=True, null=False)
    created_at = DateTimeField(auto_now_add=True, blank=True, null=False)
    modified_by = CharField(max_length=255, blank=True, null=False)
    modified_at = DateTimeField(auto_now=True, blank=True, null=False)
    deleted_by = CharField(max_length=255, blank=True, null=True, default=None)
    deleted_at = DateTimeField(blank=True, null=True, default=None)

    class Meta:
        abstract = True

    def to_dict(self):
        dby = self.deleted_by
        dat = self.deleted_at
        d = {
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat(),
            'modified_by': self.modified_by,
            'modified_at': self.modified_at.isoformat(),
            'deleted_by': dby if dby else None,
            'deleted_at': dat.isoformat() if dat else None,
        }
        if hasattr(self, '_to_dict'):
            d.update(self._to_dict())
        return d


class Room(BaseModel):
    room_id = CharField(max_length=255, blank=False, null=False)
    title = CharField(max_length=255, blank=False, null=False)
    password = CharField(max_length=255, blank=True, null=True)
    is_private = BooleanField(default=False, blank=False, null=False)
    is_hidden = BooleanField(default=False, blank=False, null=False)
    # relation
    members = ManyToManyField(User, through='UserRoomRelation')

    def _to_dict(self):
        return {
            'room_id': self.room_id,
            'title': self.title,
            'is_private': self.is_private,
            'is_hidden': self.is_hidden,
        }


class UserRoomRelation(BaseModel):
    handle_name = CharField(max_length=255, blank=False, null=False)
    role = PositiveSmallIntegerField(choices=settings.ROLE_CHOICES, default=0)
    # relation
    chat_user = ForeignKey(User, on_delete=CASCADE)
    chat_room = ForeignKey(Room, on_delete=CASCADE)

    def _to_dict(self):
        return {
            'handle_name': self.handle_name,
            'role': self.role,
        }

# messageはredisで管理する
# class Message(BaseModel):
#     content = CharField(max_length=1024, blank=False, null=False)
#     # relation
#     dest_message = OneToOneField('self', blank=True, null=True)
#     chat_user = ForeignKey(User, on_delete=CASCADE)
#     chat_room = ForeignKey(Room, on_delete=CASCADE)
#
#     def _to_dict(self):
#         return {
#             'message_id': self.pk,
#             'content': self.content,
#             'dest_message': self.dest_message.pk if self.dest_message else None,
#         }
