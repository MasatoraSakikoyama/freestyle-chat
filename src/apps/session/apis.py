# -*- coding: utf-8 -*-
from json import loads, dumps, JSONDecodeError

from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db.transaction import atomic
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from .forms import UserForm
from .models import User


@require_http_methods(['GET'])
def check_api(request):
    return HttpResponse(
        content='ok',
        status=200,
    )


@require_http_methods(['POST'])
@atomic
def login_api(request):
    try:
        data = loads(request.body.decode('utf-8'))
    except JSONDecodeError or ValueError:
        return HttpResponse(
            content=dumps({'message': 'Request body is invalid'}),
            status=400,
            content_type='application/json',
        )
    # user form class
    user = authenticate(
        user_id=data.get('user_id'),
        password=data.get('password'),
    )
    if user:
        login(request, user)
        return HttpResponse(
            content=dumps({'message': 'Login success'}),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(
            content=dumps({'message': 'Invalid param'}),
            status=400,
            content_type='application/json',
        )


@require_http_methods(['POST'])
@atomic
def logout_api(request):
    logout(request)
    return HttpResponse(
        content=dumps({'message': 'Logout success'}),
        status=200,
        content_type='application/json',
    )


@login_required(login_url='/')
@require_http_methods(['GET', 'POST', 'PUT'])
@atomic
def user_api(request, user_id):
    if request.method == 'GET':
        user = get_object_or_404(
            User,
            user_id=user_id,
            deleted_at=None,
        )
        return HttpResponse(
            content=dumps(user.to_dict()),
            status=200,
            content_type='application_json',
        )
    elif request.method == 'POST' and user_id == 'create':
        try:
            form = UserForm(loads(request.body.decode('utf-8')))
        except JSONDecodeError or ValueError:
            return HttpResponse(
                content=dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            user = User.objects.create(form.cleaned_data)
            return HttpResponse(
                content=dumps(user.to_dict()),
                status=200,
                content_type='application_json',
            )
        else:
            return HttpResponse(
                content=dumps(form.errors),
                status=400,
                content_type='application/json',
            )
    elif request.method == 'PUT':
        try:
            form = UserForm(loads(request.body.decode('utf-8')))
        except UnicodeDecodeError or ValueError:
            return HttpResponse(
                content=dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            data = form.cleaned_data
            user = get_object_or_404(user_id=user_id)
            user.name = data['name']
            user.password = data['password']
            user.deleted_at = data['deleted_at']
            user.save()
            return HttpResponse(
                content=dumps(user.to_dict()),
                status=200,
                content_type='application_json',
            )
        else:
            return HttpResponse(
                content=dumps(form.errors),
                status=400,
                content_type='application/json',
            )
    else:
        return HttpResponse(
            status=405,
        )
