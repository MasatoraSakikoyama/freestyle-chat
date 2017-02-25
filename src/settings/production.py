import os

import dj_database_url

from settings.base import *


DEBUG = False

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

db_from_env = dj_database_url.config(conn_max_age=400)

DATABASES['default'].update(db_from_env)

BROKER_URL = os.environ['REDIS_URL']
