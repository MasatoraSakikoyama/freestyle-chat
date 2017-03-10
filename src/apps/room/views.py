# -*- coding: utf-8 -*-
from django.http import HttpResponse
from channels import Group


def publish(request):
    m = request.GET.get('message')
    Group('sample').send({'text': m})
    return HttpResponse('Success')rom django.shortcuts import render
