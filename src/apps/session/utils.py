# -*- coding: utf-8 -*-
from functools import wraps

import jwt
from django.conf import settings
from django.http import HttpResponse


def api_login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not args[0].user.is_authenticated():
            return HttpResponse(status=401)
        return func(*args, **kwargs)
    return wrapper


def api_token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        request = args[0]
        if request.method in ['POST', 'PUT', 'DELETE']:
            try:
                token = request.META['HTTP_AUTHORIZATION']
                payload = jwt.decode(
                    token,
                    settings.SECRET_KEY,
                    algorithms=['HS256']
                )
                if payload.get('user_id') != request.user.user_id:
                    raise Exception
            except:
                return HttpResponse(status=401)
        return func(*args, **kwargs)
    return wrapper
