# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-31 16:09
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('proves', '0003_auto_20171030_2145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nota',
            name='alumne',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='nota_alumne', to='alumnes.Alumne'),
        ),
    ]