# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Curs(models.Model):

	nom = models.CharField(max_length=120)

	def get_absolute_url(self):
		return reverse("cursos-api:detail", kwargs={"pk": self.id})

	def __unicode__(self):
		return "Curs %s" % (self.nom)