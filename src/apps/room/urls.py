# -*- coding: utf-8 -*-
from django.conf.urls import url

from .apis import rooms_api, room_api

rooms_urlpatterns = [
    url(r'$', rooms_api, name='rooms'),
]

room_urlpatterns = [
    url(r'/(?P<room_id>[a-z0-9-]+)$', room_api, name='room'),
]
