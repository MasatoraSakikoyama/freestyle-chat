from django.conf.urls import url, include
from django_my_session.urls import urlpatterns as session_urls


urlpatterns = [
    url(r'^api/session', include(session_urls)),
]
