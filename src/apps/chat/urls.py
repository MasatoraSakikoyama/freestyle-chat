# -*- coding: utf-8 -*-
from django.conf.urls import url

from .apis import messages_api

urlpatterns = [
    url(r'/(?P<room_id>[a-z0-9-]+)$', messages_api, name='messages'),
]
