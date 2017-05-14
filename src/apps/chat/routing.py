# -*- coding: utf-8 -*-
from channels.routing import route_class, route

from .consumers import connect, receive, disconnect

channel_routing = [
    route(
        'websocket.connect',
        connect,
        path=r'^/api/chat/(?P<room_id>[a-z0-9-_]+)$'
    ),
    route(
        'websocket.receive',
        receive,
        path=r'^/api/chat/(?P<room_id>[a-z0-9-_]+)$'
    ),
    route(
        'websocket.disconnect',
        disconnect,
        path=r'^/api/chat/(?P<room_id>[a-z0-9-_]+)$'
    ),
]
