# -*- coding: utf-8 -*-
from django.conf.urls import url, include

from apps.session.urls import urlpatterns as session_urls
from apps.ws.urls import urlpatterns as ws_urls


urlpatterns = [
    url(r'^api/session', include(session_urls)),
    url(r'^api/ws', include(ws_urls)),
]
