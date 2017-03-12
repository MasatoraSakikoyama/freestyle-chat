# -*- coding: utf-8 -*-
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin
)
from django.db.models import (
    CharField,
    DateTimeField,
    BooleanField,
)


class UserManager(BaseUserManager):
    def get_by_natural_key(self, user_id):
        return self.get(user_id=user_id)

    def create_user(self, name, user_id, password):
        if not user_id:
            raise ValueError('User must have an user_id')
        if not name:
            raise ValueError('User must have an name')
        user = self.model(
            name=name,
            user_id=user_id,
            password=password
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, user_id, password):
        user = self.create_user(name, user_id, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    user_id = CharField(unique=True, max_length=255, blank=False, null=False)
    password = CharField(unique=False, max_length=255, blank=False, null=False)
    name = CharField(max_length=255, blank=False, null=False)
    created_at = DateTimeField(auto_now_add=True, blank=True, null=False)
    modified_at = DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = DateTimeField(blank=True, null=True)
    is_staff = BooleanField(default=False, blank=True, null=False)

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['name']

    def get_short_name(self):
        # Returns the short name for the user.
        return self.name

    def to_dict(self):
        dat = self.deleted_at
        return {
            'user_id': self.user_id,
            'name': self.name,
            'created_at': self.created_at.isoformat(),
            'modified_at': self.modified_at.isoformat(),
            'deleted_at': dat.isoformat() if dat else None,
        }
