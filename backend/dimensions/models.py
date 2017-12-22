# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.timezone import now
from django.db import models

# Create your models here.


class Dimensio(models.Model):

	nom 		= models.CharField(max_length=120)
	data 		= models.DateField(default=now)
	descripcio	= models.TextField(blank=True, null=True)
	avaluacio 	= models.ForeignKey('assignatures.Avaluacio', related_name='avaluacio_dimensions',blank=True, null=True)
	pes_total 	= models.FloatField()
	nota_total 	= models.FloatField()
	nota_mitja 	= models.FloatField(blank=True, null=True)
	# assignatura = models.ForeignKey('assignatures.Assignatura', related_name='proves_assignatura',blank=True, null=True)

	def __unicode__(self):
		return "%s" % (self.nom)


class Nota_Dimensio(models.Model):

	nota 		= models.FloatField(null=False)
	dimensio	= models.ForeignKey('Dimensio', related_name='dimensio_notes', blank=True)
	alumne 		= models.ForeignKey('alumnes.Alumne', related_name='alumne_notes_dimensio', blank=True, null=True)

	def __unicode__(self):
		return "%s - %s %s - %s" % (self.dimensio, self.alumne.nom, self.alumne.primer_cognom, self.nota)


	def save(self, *args, **kwargs):
		super(Nota_Dimensio, self).save(*args, **kwargs)