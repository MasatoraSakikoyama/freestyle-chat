# -*- coding: utf-8 -*-
import json

from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from .forms import UserForm
from .models import User


@require_http_methods(['GET'])
def check_view(request):
    return HttpResponse(
        content='ok',
        status=200,
    )


@require_http_methods(['POST'])
def login_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return HttpResponse(
            content=json.dumps({'message': 'Request body is invalid'}),
            status=400,
            content_type='application/json',
        )
    # user form class
    user = authenticate(
        employeenumber=data.get('employeeNumber'),
        password=data.get('password'),
    )
    if user:
        login(request, user)
        return HttpResponse(
            content=json.dumps({'message': 'Login success'}),
            status=200,
            content_type='application/json',
        )
    else:
        return HttpResponse(
            content=json.dumps({'message': 'Invalid param'}),
            status=400,
            content_type='application/json',
        )


@require_http_methods(['POST'])
def logout_view(request):
    logout(request)
    return HttpResponse(
        content=json.dumps({'message': 'Logout success'}),
        status=200,
        content_type='application/json',
    )


@login_required(login_url='/')
@require_http_methods(['GET', 'POST', 'PUT', 'DELETE'])
def user_view(request, pk):
    if request.method == 'GET':
        user = get_object_or_404(User, pk=pk)
        return HttpResponse(
            content=json.dumps(user.to_dict()),
            status=200,
            content_type='application_json',
        )
    elif request.method in ('POST', 'PUT'):
        try:
            form = UserForm(json.loads(request.body.decode('utf-8')))
            form.pk = pk
        except Exception:
            return HttpResponse(
                content=json.dumps({'message': 'Request body is invalid'}),
                status=400,
                content_type='application/json',
            )
        if form.is_valid():
            user = User.save(form.cleaned_data)
            return HttpResponse(
                content=json.dumps(user.to_dict()),
                status=200,
                content_type='application_json',
            )
        return HttpResponse(
            content=json.dumps(form.errors),
            status=400,
            content_type='application/json',
        )
    elif request.method == 'DELETE':
        get_object_or_404(User, pk=pk).delete()
        return HttpResponse(
            status=204,
            content_type='application/json',
        )
