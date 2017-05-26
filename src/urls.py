# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from django.views.generic import RedirectView, TemplateView

from apps.session.urls import urlpatterns as session_urls
from apps.room.urls import (
    rooms_urlpatterns as rooms_urls,
    room_urlpatterns as room_urls,
)
from apps.chat.urls import urlpatterns as messages_urls

urlpatterns = [
    url(r'^$', RedirectView.as_view(url=r'app/')),
    url(r'^/$', RedirectView.as_view(url=r'app/')),
    url(r'^app$', RedirectView.as_view(url=r'app/')),
    url(r'^app/$', TemplateView.as_view(template_name='index.html')),
    url(r'^api/session', include(session_urls)),
    url(r'^api/rooms', include(rooms_urls)),
    url(r'^api/room', include(room_urls)),
    url(r'^api/messages', include(messages_urls)),
]
