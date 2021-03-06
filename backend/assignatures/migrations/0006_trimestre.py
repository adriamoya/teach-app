# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-10 09:53
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assignatures', '0005_auto_20171201_1510'),
    ]

    operations = [
        migrations.CreateModel(
            name='Trimestre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num', models.PositiveIntegerField()),
                ('curs', models.PositiveIntegerField(blank=True, null=True)),
                ('assignatura', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trimestre_assignatura', to='assignatures.Assignatura')),
            ],
        ),
    ]
