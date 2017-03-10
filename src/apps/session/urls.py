# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import check_view, login_view, logout_view, user_view

urlpatterns = [
    url(r'check$', check_view),
    url(r'login$', login_view, name='login'),
    url(r'logout$', logout_view, name='logout'),
    url(r'user/(?P<pk>[0-9]+)$', user_view),
]
