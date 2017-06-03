FROM mariadb:10.3.0

ENV HOME /home
ENV MYSQL_ROOT_PASSWORD root

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y vim vim-gnome

COPY my.cnf /etc/mysql/
