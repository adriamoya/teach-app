# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-29 22:39
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0005_remove_classe_professors'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='classe',
            name='alumnes',
        ),
    ]
