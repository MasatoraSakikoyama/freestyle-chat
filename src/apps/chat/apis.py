# -*- coding: utf-8 -*-
from json import dumps

from django.views.decorators.http import require_http_methods, condition
from django.http import HttpResponse
from django.core.cache import caches

from .utils import datetime_default


@condition(etag_func=None)
@require_http_methods(['GET'])
def messages_api(request, room_id):
    # ToDo: StreamingHttpResponseでSSEにしたい
    if request.method == 'GET':
        cache = caches['messages']
        keys = cache.keys('*{}_*'.format(room_id))
        messages = list(cache.get_many(keys).values())
        return HttpResponse(
            content=dumps(messages, default=datetime_default),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(
            status=405,
        )
