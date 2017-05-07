# -*- coding: utf-8 -*-
from datetime import datetime
from json import loads, dumps, JSONDecodeError

from django.views.decorators.http import require_http_methods
from django.db.transaction import atomic
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from apps.session.utils import api_login_required, api_token_required
from apps.orm.forms import RoomForm
from apps.orm.models import Room
from .utils import room_id_generator


@require_http_methods(['GET'])
@atomic
def rooms_api(request, order_by='pk', limit=30, offset=0, **kwargs):
    if request.method == 'GET':
        query = Room.objects.filter(deleted_by='').filter(deleted_at=None)
        search_by = kwargs.get('search_by')
        search = kwargs.get('search')
        if search_by and search:
            query = query.filter(search_by=search)
        step = limit * offset
        rooms = query.order_by(order_by)[0 + step:limit - 1 + step]
        return HttpResponse(
            content=dumps([r.to_dict() for r in rooms]),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(
            status=405,
        )


@require_http_methods(['GET', 'POST', 'PUT', 'DELETE'])
@api_login_required(['POST', 'PUT', 'DELETE'])
@api_token_required(['POST', 'PUT', 'DELETE'])
@room_id_generator
@atomic
def room_api(request, room_id):
    if request.method == 'GET':
        room = get_object_or_404(
            Room,
            room_id=room_id,
            deleted_by='',
            deleted_at=None,
        )
        return HttpResponse(
            content=dumps(room.to_dict()),
            status=200,
            content_type='application/json',
        )
    elif request.method == 'POST':
        try:
            data = loads(request.body.decode('utf-8'))
            data['room_id'] = room_id
            data['created_by'] = request.user.user_id
            data['modified_by'] = request.user.user_id
            form = RoomForm(data)
        except UnicodeDecodeError or JSONDecodeError or ValueError:
            return HttpResponse(
                content=dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            room = Room.objects.create(**form.cleaned_data)
            return HttpResponse(
                content=dumps(room.to_dict()),
                status=200,
                content_type='application/json',
            )
        else:
            return HttpResponse(
                content=dumps(form.errors),
                status=400,
                content_type='application/json',
            )
    elif request.method == 'PUT':
        try:
            form = RoomForm(loads(request.body.decode('utf-8')))
        except UnicodeDecodeError or JSONDecodeError or ValueError:
            return HttpResponse(
                content=dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            data = form.cleaned_data
            room = get_object_or_404(room_id=room_id)
            room.title = data['title']
            room.password = data['password']
            room.is_private = data['is_private']
            room.is_anonymous = data['is_anonymous']
            room.modified_by = request.user.user_id
            room.save()
            return HttpResponse(
                content=dumps(room.to_dict()),
                status=200,
                content_type='application_json',
            )
        else:
            return HttpResponse(
                content=dumps(form.errors),
                status=400,
                content_type='application/json',
            )
    elif request.method == 'DELETE':
        room = get_object_or_404(
            Room,
            room_id=room_id,
        )
        room.deleted_by = request.user.user_id
        room.deleted_at = datetime.now()
        room.save()
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
