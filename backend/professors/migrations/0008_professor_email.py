# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-31 21:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professors', '0007_auto_20171031_2057'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]