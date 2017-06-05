# -*- coding: utf-8 -*-
from json import dumps

from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.core.cache import caches

from apps.orm.models import Room, UserRoomRelation
from .utils import datetime_default


@require_http_methods(['GET'])
def messages_api(request, room_id):
    # ToDo: StreamingHttpResponseでSSEにしたい もしくはページネーション
    if request.method == 'GET':
        room = get_object_or_404(
            Room,
            room_id=room_id,
            deleted_by='',
            deleted_at=None,
        )
        if room.is_private and not UserRoomRelation.objects.filter(
            chat_user=request.user,
            chat_room=room,
        ).exists():
            return HttpResponse(status=403)

        cache = caches['messages']
        # redisのprefixを検索文字列に含めると上手く取れない
        keys = cache.keys('{}_*'.format(room_id))
        messages = sorted(
            cache.get_many(keys).values(),
            key=lambda x: x['created_at'].timestamp()
        )
        return HttpResponse(
            content=dumps(messages, default=datetime_default),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(status=405)
