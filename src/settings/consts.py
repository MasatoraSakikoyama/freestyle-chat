# -:- coding: utf-8 -*-
import os

ENVIRON_NAME = 'HEROKU' if os.environ.get('HEROKU') else 'DEVELOP'

REDIS_DB_NAME = {
    'DEVELOP': 'messages',
    'HEROKU': 'default',
}[ENVIRON_NAME]

ROLE_CHOICES = (
    (0, 'RWX'),
    (1, 'RW'),
    (2, 'R'),
)
