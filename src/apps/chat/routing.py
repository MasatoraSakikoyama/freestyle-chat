# -*- coding: utf-8 -*-
from channels.routing import route

from .consumers import connect, receive, disconnect

channel_routing = [
    route('websocket.connect', connect, path=r'^/api/chat/(?P<room_id>[a-zA-Z0-9_]+)$'),
    route('websocket.receive', receive, path=r'^/api/chat/(?P<room_id>[a-zA-Z0-9_]+)$'),
    route('websocket.disconnect', disconnect, path=r'^/api/chat/(?P<room_id>[a-zA-Z0-9_]+)$'),
]
