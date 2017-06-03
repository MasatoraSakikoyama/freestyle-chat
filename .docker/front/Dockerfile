FROM node:7.10.0

ENV HOME /home

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y vim vim-gnome

RUN mkdir -p /var/www/websocket-test
WORKDIR /var/www/websocket-test
