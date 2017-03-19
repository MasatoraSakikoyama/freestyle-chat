# -*- coding: utf-8 -*-
from json import dumps
from functools import wraps

from django.http import HttpResponse


def api_login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not args[0].user.is_authenticated():
            return HttpResponse(
                content=dumps({'message': 'Please Login'}),
                status=401,
                content_type='application/json',
            )
        return func(*args, **kwargs)
    return wrapper
