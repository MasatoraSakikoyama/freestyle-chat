# -*- coding: utf-8 -*-
from django.conf.urls import url

from apps.ws.views import publish

urlpatterns = [
    url(r'publish$', publish, name='publish'),
]
