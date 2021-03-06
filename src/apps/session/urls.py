# -*- coding: utf-8 -*-
from django.conf.urls import url

from .apis import (
    check_api,
    login_api,
    logout_api,
    token_api,
    user_api
)

urlpatterns = [
    url(r'check$', check_api),
    url(r'login$', login_api, name='login'),
    url(r'logout$', logout_api, name='logout'),
    url(r'token$', token_api),
    url(r'user/(?P<user_id>[a-zA-Z0-9_-]+)$', user_api),
]
