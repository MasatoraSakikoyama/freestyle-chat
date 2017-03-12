# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import rooms_view, room_view

rooms_urlpatterns = [
    url(r'$', rooms_view, name='rooms'),
]

room_urlpatterns = [
    url(r'/(?P<room_id>[a-z0-9-]+)$', room_view, name='room'),
]
