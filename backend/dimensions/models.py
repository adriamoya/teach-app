# -*- coding: utf-8 -*-
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.timezone import now

import numpy as np

from assignatures.models import Avaluacio
from proves.models import Prova, Nota



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

	def notes(self):
		instance = self
		qs = Nota.objects.filter_by_instance(instance)
		return qs

	# @property
	# def subdimensions(self):
	# 	instance = self
	# 	qs = Dimensio.objects.filter_by_instance(instance)
	# 	return qs


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
		dimensio_id 			= instance.id
		dimensio_content_type 	= ContentType.objects.get_for_model(instance.__class__)
		# dimensio_parent_obj		= instance.dimensio
		avaluacio_obj 			= instance.avaluacio
		# create the Total dimensio instance
		# dimensio_avaluacio = Dimensio.objects.get_or_create(
		# 	nom 		= '_Total',
		# 	avaluacio 	= avaluacio_obj,
		# 	dimensio 	= dimensio_parent_obj,
		# 	pes_total	= 1,
		# 	nota_total	= 10,
		# 	)

		# retrieve alumnes from avaluacio (assignatura)
		qs_alumnes = Avaluacio.get_alumnes(avaluacio_obj)

		for alumne_obj in qs_alumnes:
			# Create notes for current dimensio
			Nota.objects.get_or_create(
				nota 			= 0,
				content_type	= dimensio_content_type,
				object_id 		= dimensio_id,
				alumne 			= alumne_obj,
			)


	@classmethod
	def recalculate_params(cls, sender, instance, **kwargs):
		'''
		This method is triggered after post_save of a Nota instance.
		It is meant to do the following:
			-	Recalculate the mean (nota_mitja) of the prova linked to the nota created/changed.
			-	Update the prova_avaluacio with the new notes
		'''
		if sender == Nota:
			# grab the current instance of Dimensio
			dimensio_id = instance.object_id # get the id
			qs = Dimensio.objects.filter(id = dimensio_id) # filter Dimensio objects by this id

			dimensio_obj = qs.first()

		elif sender == Dimensio:
			dimensio_obj = instance

		qs_notes = dimensio_obj.notes() # calculate the mean of all the notes of this prova

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
		qs_prova = Dimensio.objects.filter(id=dimensio_obj.id).update(nota_mitja=nota_mitja)

		# Retrieve list of alumnes in corresponding assignatura
		avaluacio_obj = dimensio_obj.avaluacio
		qs_alumnes = Avaluacio.get_alumnes(avaluacio_obj)

		# Recalculate the final notes for the corresponding dimensio
		if dimensio_obj.dimensio:
			# Parent dimensio
			parent_dimensio_obj = dimensio_obj.dimensio

			# Subdimensions
			qs_subdimensions = parent_dimensio_obj.subdimensions.all() # includes _Total
			qs_subdimensions_adj = qs_subdimensions.all().exclude(nom__iexact='_Total')

			pes_total = 0
			for subdimensio in qs_subdimensions_adj:
				pes_total += subdimensio.pes_total

			# create a list of objects that represents notes_dimensio
			notes_dimensio = []
			notes_dimensio_array = []
			for alumne in qs_alumnes:
				nota_dimensio_alumne = []
				for subdimensio in qs_subdimensions_adj:
					for nota in subdimensio.notes():
						if nota.alumne.id == alumne.id:
							nota_dimensio_alumne.append(nota.nota*subdimensio.pes_total/subdimensio.nota_total)
				notes_dimensio.append(
					{ 
						'nota': np.sum(nota_dimensio_alumne)*10/pes_total,
						'dimensio': parent_dimensio_obj.id,
						'alumne': alumne.id
					}
				)
				notes_dimensio_array.append(np.sum(nota_dimensio_alumne)*10/pes_total)

			nota_mitja = np.mean(notes_dimensio_array) # calculating the mean of all the notes
			nota_mitja = np.nan_to_num(nota_mitja) # translating nan to 0


			# Updating parent dimensio
			Dimensio.objects.filter(id=parent_dimensio_obj.id).update(nota_mitja=nota_mitja)

			for alumne_obj in qs_alumnes:
				nota = [nota['nota'] for nota in notes_dimensio if nota['alumne'] == alumne_obj.id][0]
				nota_obj = Nota.objects.filter(alumne=alumne_obj, object_id=parent_dimensio_obj.id).first()
				if nota_obj:
					nota_obj.nota = nota
					nota_obj.save()

				# qs_nota = Nota.objects.filter(alumne=alumne_obj).filter(object_id=parent_dimensio_obj.id).update(nota=nota)



post_save.connect(receiver=Dimensio.create_dimensio_final_avaluacio, sender=Dimensio)

post_save.connect(receiver=Dimensio.recalculate_params, sender=Nota)

post_delete.connect(receiver=Dimensio.recalculate_params, sender=Nota)

# post_save.connect(receiver=Dimensio.recalculate_params, sender=Dimensio)


# post_delete.connect(receiver=Dimensio.recalculate_params, sender=Dimensio)

# post_save.connect(receiver=Dimensio.create_dimensio_final_avaluacio, sender=Avaluacio)



