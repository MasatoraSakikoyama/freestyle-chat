# -*- coding: utf-8 -*-
import os
import socket

from .base import *

SECRET_KEY = 'jr&r#)5y%i$_!+yob#g+vmk)^kl=p-j5!#lg6lb3@&ccq=@bf#'

DEBUG = True

ALLOWED_HOSTS = ['*']

TEMPLATES[0]['DIRS'] = ['apps/frontend/dist']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
DJANGO_REDIS_LOGGER = 'console'

CACHE_HOST = socket.gethostbyname('cache')
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://{}:6379/1'.format(CACHE_HOST),
        'KEY_PREFIX': 'cache_',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'CONNECTION_POOL_KWARGS': {'max_connections': 100},
        }
    },
    'messages': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://{}:6379/2'.format(CACHE_HOST),
        'KEY_PREFIX': 'message_',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'CONNECTION_POOL_KWARGS': {'max_connections': 100},
        }
    },
}

SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgi_redis.RedisChannelLayer',
        'CONFIG': {
            'hosts': [(socket.gethostbyname('channel'), 6379)],
        },
        'ROUTING': 'apps.chat.routing.channel_routing',
    },
}
