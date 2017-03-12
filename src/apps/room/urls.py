# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import rooms_view, room_view

urlpatterns = [
    url(r'$', rooms_view, name='rooms'),
    url(r'/(?P<room_id>[a-zA-Z0-9]+)$', room_view, name='room'),
]
