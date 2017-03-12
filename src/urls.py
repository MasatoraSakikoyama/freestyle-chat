# -*- coding: utf-8 -*-
from django.conf.urls import url, include

from apps.session.urls import urlpatterns as session_urls
from apps.room.urls import urlpatterns as room_urls

urlpatterns = [
    url(r'^api/session', include(session_urls)),
    url(r'^api/room', include(room_urls)),
]
