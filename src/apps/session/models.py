# -*- coding: utf-8 -*-
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin
)
from django.db.models import (
    CharField,
    PositiveIntegerField,
    DateTimeField,
    BooleanField,
)
from django.core.validators import MaxValueValidator


class UserManager(BaseUserManager):
    def get_by_natural_key(self, employeenumber):
        return self.get(employeenumber=employeenumber)

    def create_user(self, name, employeenumber, password):
        if not employeenumber:
            raise ValueError('User must have an employeenumber')
        if not name:
            raise ValueError('User must have an name')
        user = self.model(
                name=name,
                employeenumber=employeenumber,
                password=password
                )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, employeenumber, password):
        user = self.create_user(name, employeenumber, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    name = CharField(unique=True, max_length=128, blank=True, )
    employeenumber = PositiveIntegerField(
        unique=True,
        validators=[MaxValueValidator(9999)],
        blank=True,
        null=False
    )
    password = CharField(unique=False, max_length=128, blank=True, null=False)
    created_date = DateTimeField(auto_now_add=True, blank=True, null=False)
    modified_date = DateTimeField(auto_now=True, blank=True, null=False)
    is_staff = BooleanField(default=False, blank=True, null=False)

    USERNAME_FIELD = 'employeenumber'
    REQUIRED_FIELDS = ['name']

    def get_short_name(self):
        # Returns the short name for the user.
        return self.name

    def to_dict(self):
        return {
            'name': self.name,
            'created_date': self.created_date.isoformat(),
            'modified_date': self.modified_date.isoformat(),
        }
