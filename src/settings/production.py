# -*- coding: utf-8 -*-
import os

import dj_database_url

from .base import *

SECRET_KEY = ''

DEBUG = False

ALLOWED_HOSTS = ['']

MIDDLEWARE.insert(3, 'django.middleware.csrf.CsrfViewMiddleware')

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

TEMPLATES[0]['DIRS'] = ['src/static']

DATABASES = {
    'default': dj_database_url.config(conn_max_age=400)
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'ERROR',
        },
    },
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgi_redis.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('localhost', 6379)],
        },
        'ROUTING': 'apps.chat.routing.channel_routing',
    },
}
