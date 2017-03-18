# -*- coding:utf-8 -*-
from functools import wraps

from haikunator import Haikunator

from apps.orm.models import Room


def room_id_generator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if args[0].method == 'POST' and kwargs.get('room_id') == 'create':
            while True:
                room_id = Haikunator.haikunate(100000)
                if Room.objects.filter(room_id=room_id).exists():
                    continue
                kwargs['room_id'] = room_id
                break
        return func(*args, **kwargs)
    return wrapper
