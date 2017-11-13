# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-29 22:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alumnes', '0002_auto_20171029_1550'),
        ('assignatures', '0004_auto_20171029_2234'),
        ('proves', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prova',
            name='notes',
        ),
        migrations.RemoveField(
            model_name='nota',
            name='alumne',
        ),
        migrations.AddField(
            model_name='nota',
            name='alumne',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='alumnes.Alumne'),
        ),
        migrations.RemoveField(
            model_name='prova',
            name='assignatura',
        ),
        migrations.AddField(
            model_name='prova',
            name='assignatura',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='assignatures.Assignatura'),
        ),
    ]