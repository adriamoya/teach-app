# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-22 18:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dimensions', '0003_auto_20171222_1804'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nota_dimensio',
            name='dimensio',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='notes_dimensio', to='dimensions.Dimensio'),
        ),
    ]
