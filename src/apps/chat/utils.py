# -*- coding: utf-8 -*-
from datetime import datetime
from functools import wraps

from apps.orm.models import User


def get_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if args[0].user.is_anonymous:
            user = User(
                pk=0,
                user_id='system',
                password='system',
                name='system',
            )
        else:
            user = User.objects.get(user_id=args[0].user.user_id)
        kwargs['user'] = user
        return func(*args, **kwargs)
    return wrapper


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')
