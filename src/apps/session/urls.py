# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'check$', views.check_view),
    url(r'login$', views.login_view, name='login'),
    url(r'logout$', views.logout_view, name='logout'),
    url(r'user/(?P<pk>[0-9]+)$', views.user_view),
]
