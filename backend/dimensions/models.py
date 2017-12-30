# -*- coding: utf-8 -*-
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.timezone import now

import numpy as np

from assignatures.models import Avaluacio
from alumnes.models import Alumne
from proves.models import Prova

# Create your models here.



class DimensioManager(models.Manager):
	
	def filter_by_instance(self, instance):
		content_type = ContentType.objects.get_for_model(instance.__class__)
		obj_id = instance.id
		qs = super(DimensioManager, self).filter(content_type=content_type, object_id=obj_id)
		return qs

class Dimensio(models.Model):
	'''
	Dimensio can have multiple child subdimensions.
	In order to do that we added the content_object that will point to parent dimensions.
	Null = True
	'''
	nom 			= models.CharField(max_length=120)
	data 			= models.DateField(default=now)
	descripcio		= models.TextField(blank=True, null=True)
	avaluacio 		= models.ForeignKey('assignatures.Avaluacio', related_name='dimensions_avaluacio',blank=True, null=True)
	dimensio 		= models.ForeignKey('dimensions.Dimensio', related_name='subdimensions', blank=True, null=True)
	pes_total 		= models.FloatField()
	nota_total 		= models.FloatField()
	nota_mitja 		= models.FloatField(blank=True, null=True)

	content_type 	= models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
	object_id 		= models.PositiveIntegerField(null=True, blank=True)
	content_object 	= GenericForeignKey('content_type', 'object_id')

	objects			= DimensioManager()

	@property
	def proves(self):
		instance = self
		qs = Prova.objects.filter_by_instance(instance)
		return qs

	# @property
	# def subdimensions(self):
	# 	instance = self
	# 	qs = Dimensio.objects.filter_by_instance(instance)
	# 	return qs

	# assignatura = models.ForeignKey('assignatures.Assignatura', related_name='proves_assignatura',blank=True, null=True)

	def __unicode__(self):
		return unicode(self.nom)

	@classmethod
	def create_dimensio_final_avaluacio(cls, sender, instance, created, **kwargs):
		'''
		This method is triggered after post_save of an Avaluacio instance.
		It creates a Dimensio instance (Total) that will wrap up all the notes
		from the various dimensions linked to that avaluacio.
		In addition, inizialization of the notes that populate the Total dimensio
		is required to reserve some id in the db.
		'''

		# retrieve Avaluacio instance passed by post_save method (sender)
		print('Create dimensio final avaluacio')
		print('----------------------------------------')
		avaluacio_id = instance.id
		avaluacio_obj = Avaluacio.objects.filter(id = avaluacio_id).first() # retrieve newly created avaluacio instance 
		
		# create the Total dimensio instance
		dimensio_avaluacio = Dimensio.objects.get_or_create(
			nom 		= 'Total avaluacio',
			avaluacio 	= avaluacio_obj,
			pes_total	= 1,
			nota_total	= 10,
			)

		# retrieve id of Total dimensio
		dimensio_avaluacio_obj = Dimensio.objects.filter(avaluacio = avaluacio_id).first()
		# print(dimensio_avaluacio_obj.id)

		# retrieve alumnes from avaluacio (assignatura)
		qs_alumnes = Avaluacio.get_alumnes(avaluacio_obj)
		# print(qs_alumnes)

		for alumne_obj in qs_alumnes:
			Nota_Dimensio.objects.create(
				nota 	= 0,
				alumne 	= alumne_obj,
				dimensio 	= dimensio_avaluacio_obj
			)

		# the create method is assigning NaN to all the notes
		# the api call will return a json with NaN in floatfield and will
		# produce errors in the frontend.
		# in order to ammend this, we update all the notes from this newly created prova
		# with 0.
		Nota_Dimensio.objects.filter(dimensio=dimensio_avaluacio_obj).update(nota=0)


	# this method is triggered after a nota is assigned to a prova (post_save signal)
	@classmethod
	def recalculate_params(cls, sender, instance, **kwargs):
		'''
		This method is triggered after post_save of a Nota instance.
		It is meant to do the following:
			-	Recalculate the mean (nota_mitja) of the prova linked to the nota created/changed.
			-	Update the prova_avaluacio with the new notes
		'''

		if sender == Nota_Dimensio:
			# grab the current instance of Dimensio
			dimensio_id = instance.dimensio.id # get the id
			qs = Dimensio.objects.filter(id = dimensio_id) # filter Dimensio objects by this id

			dimensio_obj = qs.first()

		elif sender == Dimensio:
			dimensio_obj = instance

		qs_notes = dimensio_obj.notes_dimensio.all() # calculate the mean of all the notes of this prova

		# wraps all the notes in an array in order to use numpy
		notes_array = []
		for nota in qs_notes:
			notes_array.append(nota.nota)

		nota_mitja = np.mean(notes_array) # calculating the mean of all the notes
		nota_mitja = np.nan_to_num(nota_mitja) # translating nan to 0
		# print(nota_mitja)

		# assigning this mean to the filtered prova
		# It is important to note that we are using update() method instead of .save() to avoid
		# recursion with post_save method. To use .update() it is necessary to pass in a queryset (qs_prova),
		# not the object (dimensio_obj)
		qs_prova = Dimensio.objects.filter(id = dimensio_obj.id).update(nota_mitja=nota_mitja)

		# Recalculate the final notes for the corresponding avaluacio
		pes_total, notes_avaluacio, dimensio_avaluacio_obj, qs_alumnes_avaluacio = Avaluacio.recalculate_dimensions_avaluacio(dimensio_obj.avaluacio)

		# updating the total weight of the prova_avaluacio (based on the weights of individuals proves)
		qs_prova = Dimensio.objects.filter(id = dimensio_avaluacio_obj.id).update(pes_total=pes_total)

		for alumne_obj in qs_alumnes_avaluacio:
			nota = [nota['nota'] for nota in notes_avaluacio if nota['alumne'] == alumne_obj.id][0]
			qs_nota = Nota_Dimensio.objects.filter(alumne = alumne_obj).filter(dimensio = dimensio_avaluacio_obj).update(nota=nota)



class Nota_Dimensio(models.Model):

	nota 		= models.FloatField(null=False)
	dimensio	= models.ForeignKey('Dimensio', related_name='notes_dimensio', blank=True)
	alumne 		= models.ForeignKey('alumnes.Alumne', related_name='alumne_notes_dimensio', blank=True, null=True)

	def __unicode__(self):
		return '%s - %s' % (unicode(self.alumne.nom), unicode(self.nota))


	def save(self, *args, **kwargs):
		super(Nota_Dimensio, self).save(*args, **kwargs)



# post_save.connect(receiver=Dimensio.create_dimensio_final_avaluacio, sender=Dimensio)


# post_save.connect(receiver=Dimensio.recalculate_params, sender=Nota_Dimensio)

# post_save.connect(receiver=Dimensio.recalculate_params, sender=Dimensio)

# post_delete.connect(receiver=Dimensio.recalculate_params, sender=Nota_Dimensio)

# post_delete.connect(receiver=Dimensio.recalculate_params, sender=Dimensio)

# post_save.connect(receiver=Dimensio.create_dimensio_final_avaluacio, sender=Avaluacio)



