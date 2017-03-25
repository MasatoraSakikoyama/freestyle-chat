# -*- coding: utf-8 -*-
import os

from .base import *

SECRET_KEY = 'jr&r#)5y%i$_!+yob#g+vmk)^kl=p-j5!#lg6lb3@&ccq=@bf#'

DEBUG = True

ALLOWED_HOSTS = ['*']

TEMPLATES[0]['DIRS'] = ['apps/frontend']

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

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgiref.inmemory.ChannelLayer',
        'ROUTING': 'apps.chat.routing.channel_routing',
    },
}
