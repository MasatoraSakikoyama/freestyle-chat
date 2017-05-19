#!/bin/bash
docker create --name dotfiles -v /Users/sakikoyama/Workspace/dotfiles/:/home busybox
docker create --name app-src -v /Users/sakikoyama/Workspace/websocket-test/:/var/www/websocket-test busybox
docker create --name front-src -v /Users/sakikoyama/Workspace/websocket-test/src/apps/frontend/:/var/www/websocket-test busybox
docker build -t front front/
docker run --name front --volumes-from front-src --volumes-from dotfiles -it front /bin/bash
