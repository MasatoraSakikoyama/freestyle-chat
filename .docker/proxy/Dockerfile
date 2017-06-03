FROM nginx:1.13.0

ENV HOME /home

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y vim vim-gnome

WORKDIR /etc/nginx/conf.d
COPY websocket-test.conf /etc/nginx/conf.d/
RUN mv default.conf default.conf.kill
