# -*- coding: utf-8 -*-
from django.db.models import (
    Model,
    CharField,
    PositiveSmallIntegerField,
    DateTimeField,
    BooleanField,
    ForeignKey,
    OneToOneField,
    ManyToManyField,
    CASCADE,
)

from apps.session.models import User


class BaseModel(Model):
    create_by = CharField(max_length=255, blank=False, null=False)
    create_at = DateTimeField(auto_now_add=True, blank=True, null=False)
    modified_by = CharField(max_length=255, blank=False, null=False)
    modified_at = DateTimeField(auto_now=True, blank=True, null=False)
    deleted_by = CharField(max_length=255, blank=False, null=False)
    deleted_at = DateTimeField(blank=True, null=True)

    class Meta:
        abstract = True

    def to_dict(self):
        d = {
            'created_at': self.created_at.isoformat(),
            'modified_at': self.modified_at.isoformat(),
            'deleted_at': self.deleted_at.isoformat(),
        }
        if hasattr(self, '_to_dict'):
            d.update(self._to_dict())
        return d


class Room(BaseModel):
    label = CharField(max_length=255, blank=False, null=False)
    title = CharField(max_length=255, blank=False, null=False)
    password = CharField(max_length=255)
    is_private = BooleanField(default=False, blank=True, null=False)
    is_anonymous = BooleanField(default=False, blank=True, null=False)
    # relation
    members = ManyToManyField(User, through='UserRoomRelation')

    def _to_dict(self):
        return {
            'room_id': self.pk,
            'label': self.label,
            'title': self.title,
            'is_private': self.is_private,
            'is_anonymous': self.is_anonymous,
        }


class UserRoomRelation(BaseModel):
    # ToDo: move settings
    ROLE_CHOICES = (
        ('RWX', 0),
        ('RW', 1),
        ('R', 2),
    )
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
