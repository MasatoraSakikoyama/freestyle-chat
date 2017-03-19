# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from django.views.generic import TemplateView

from apps.session.urls import urlpatterns as session_urls
from apps.room.urls import (
    rooms_urlpatterns as rooms_urls,
    room_urlpatterns as room_urls,
)

urlpatterns = [
    url(r'^app', TemplateView.as_view(template_name='index.html')),
    url(r'^api/session', include(session_urls)),
    url(r'^api/rooms', include(rooms_urls)),
    url(r'^api/room', include(room_urls)),
]
