# -*- coding: utf-8 -*-
from django.db.models import (
    Model,
    CharField,
    PositiveIntegerField,
    PositiveSmallIntegerField,
    DateTimeField,
    BooleanField,
    ForeignKey,
    OneToOneField,
    ManyToManyField,
    CASCADE,
)

from apps.session.models import User
from .consts import ROLE_CHOICES


class BaseModel(Model):
    created_by = PositiveIntegerField(blank=True, null=False)
    created_at = DateTimeField(auto_now_add=True, blank=True, null=False)
    modified_by = PositiveIntegerField(blank=True, null=False)
    modified_at = DateTimeField(auto_now=True, blank=True, null=False)
    deleted_by = PositiveIntegerField(blank=True, null=True)
    deleted_at = DateTimeField(blank=True, null=True)

    class Meta:
        abstract = True

    def to_dict(self):
        dat = self.deleted_at
        d = {
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat(),
            'modified_by': self.modified_by,
            'modified_at': self.modified_at.isoformat(),
            'deleted_by': self.deleted_by,
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
    is_anonymous = BooleanField(default=False, blank=False, null=False)
    # relation
    members = ManyToManyField(User, through='UserRoomRelation')

    def _to_dict(self):
        return {
            'room_id': self.room_id,
            'title': self.title,
            'is_private': self.is_private,
            'is_anonymous': self.is_anonymous,
        }


class UserRoomRelation(BaseModel):
    handle_name = CharField(max_length=255, blank=False, null=False)
    role = PositiveSmallIntegerField(choices=ROLE_CHOICES, default='RW')
    # relation
    chat_user = ForeignKey(User, on_delete=CASCADE)
    chat_room = ForeignKey(Room, on_delete=CASCADE)

    def _to_dict(self):
        return {
            'handle_name': self.handle_name,
            'role': self.role,
        }


class Message(BaseModel):
    content = CharField(max_length=1024, blank=False, null=False)
    # relation
    dest_message = OneToOneField('self')
    chat_user = ForeignKey(User, on_delete=CASCADE)
    chat_room = ForeignKey(Room, on_delete=CASCADE)

    def _to_dict(self):
        return {
            'message_id': self.pk,
            'content': self.body,
            'dest_message': getattr(self.dest_message, 'pk'),
        }


class Information(BaseModel):
    # ToDo: informationとmessageを分ける必要があるか要検討
    pass
