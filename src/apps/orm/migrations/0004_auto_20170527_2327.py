# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-27 14:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orm', '0003_auto_20170507_1555'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='is_anonymous',
            new_name='is_hidden',
        ),
    ]
