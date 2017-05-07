# -*- coding: utf-8 -*-
from datetime import datetime
from functools import wraps


def get_user_id(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        user = args[0].user
        kwargs['user_id'] = 'system' if user.is_anonymous else user.user_id
        return func(*args, **kwargs)
    return wrapper


def datetime_default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(repr(o) + 'is not JSON serializable')
