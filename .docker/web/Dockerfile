FROM python:3.6.1

LABEL "application"="websocket-test"
LABEL "version"="1.0"

ENV HOME /home

EXPOSE 8000

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y vim vim-gnome

RUN mkdir -p /var/www/websocket-test
WORKDIR /var/www/websocket-test
COPY requirements.txt /var/www/websocket-test/
RUN pip install --no-cache-dir -r requirements.txt
WORKDIR src

CMD ["/bin/bash"]
