# -*- coding: utf-8 -*-
import json
from functools import wraps

import haikunator
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.db.transaction import commit_on_success
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from apps.orm.forms import RoomForm
from apps.orm.models import Room


def room_id_generator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if args[0].content.get('method') == 'GET':
            while True:
                room_id = haikunator.haikunator()
                if Room.objects.filter(room_id=room_id).exists():
                    continue
                kwargs['room_id'] = room_id
                break
        return func(*args, **kwargs)
    return wrapper


@require_http_methods(['GET'])
def rooms_view(request, order_by='user_id', limit=30, offset=0, **kwargs):
    if request.method == 'GET':
        query = Room.objects
        search_by = kwargs.get('search_by')
        search = kwargs.get('search')
        if search_by and search:
            query = query.filter(search_by=search)
        step = limit * offset
        query = query.order_by(order_by)[0 + step:limit - 1 + step]
        return HttpResponse(
            content=json.dumps([r.to_dict() for r in query]),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(
            status=405,
        )


@login_required(login_url='/')
@require_http_methods(['GET', 'POST', 'PUT'])
@commit_on_success
@room_id_generator
def room_view(request, room_id):
    if request.method == 'GET':
        room = get_object_or_404(Room, room_id=room_id)
        return HttpResponse(
            content=json.dumps(room.to_dict()),
            status=200,
            content_type='application/json',
        )
    elif request.method == 'POST':
        try:
            form = RoomForm(json.loads(request.body.decode('utf-8')))
        except UnicodeDecodeError or ValueError:
            return HttpResponse(
                content=json.dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            room = Room.objects.create(form.cleaned_data)
            return HttpResponse(
                content=json.dumps(room.to_dict()),
                status=200,
                content_type='application_json',
            )
        else:
            return HttpResponse(
                content=json.dumps(form.errors),
                status=400,
                content_type='application/json',
            )
    elif request.method == 'PUT':
        try:
            form = RoomForm(json.loads(request.body.decode('utf-8')))
        except UnicodeDecodeError or ValueError:
            return HttpResponse(
                content=json.dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            data = form.cleaned_data
            room = get_object_or_404(room_id=room_id)
            room.title = data.title
            room.password = data.password
            room.is_private = data.is_private
            room.is_anonymous = data.is_anonymous
            room.save()
            return HttpResponse(
                content=json.dumps(room.to_dict()),
                status=200,
                content_type='application_json',
            )
        else:
            return HttpResponse(
                content=json.dumps(form.errors),
                status=400,
                content_type='application/json',
            )
    else:
        return HttpResponse(
            status=405,
        )
