# -*- coding: utf-8 -*-
from json import dumps

from django.conf import settings
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_redis import get_redis_connection

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

        connection = get_redis_connection(settings.REDIS_DB_NAME)
        messages = list(connection.lrange(room_id, 0, -1))
        return HttpResponse(
            content=dumps(messages, default=datetime_default),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(status=405)
