# -*- coding: utf-8 -*-
import haikunator
from functools import wraps

from django.http import HttpResponse
from channels import Group


def id_generator(func):
    def _generate_id():
        return haikunator.haikunate()

    @wraps(func)
    def wrapper(*args, **kwargs):
        if kwargs.get('label') == 'create':
            kwargs['label'] = _generate_id()
        return func(*args, **kwargs)
    return wrapper


def publish(request):
    m = request.GET.get('message')
    Group('sample').send({'text': m})
    return HttpResponse('Success')
