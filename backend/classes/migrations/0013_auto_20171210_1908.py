# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-10 19:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0001_initial'),
        ('classes', '0012_auto_20171210_1850'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='classe',
            name='cursos',
        ),
        migrations.AddField(
            model_name='classe',
            name='cursos',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cursos_classes', to='cursos.Curs'),
        ),
    ]
