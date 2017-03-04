# -*- coding: utf-8 -*-
import os

import dj_database_url

from settings.base import *


DEBUG = False

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

db_from_env = dj_database_url.config(conn_max_age=400)

DATABASES['default'].update(db_from_env)

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgi_redis.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('localhost', 6379)],
        },
        'ROUTING': 'ws.routing.channel_routing',
    },
}
