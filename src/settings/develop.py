# -*- coding: utf-8 -*-
from settings.base import *


DEBUG = True

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
        'BACKEND': 'asgref.inmemory.ChannelLayer',
        'ROUTING': 'ws.routing.channel_routing',
    },
}

