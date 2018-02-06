from django.db import models
from django.db.models.signals import post_save, post_delete
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils.timezone import now

import numpy as np

# from assignatures.models import Avaluacio
from alumnes.models import Alumne
# from dimensions.models import Dimensio
# Create your models here.


class ProvaManager(models.Manager):
	
	def filter_by_instance(self, instance):
		content_type = ContentType.objects.get_for_model(instance.__class__)
		obj_id = instance.id
		qs = super(ProvaManager, self).filter(content_type=content_type, object_id=obj_id)
		return qs


class Prova(models.Model):
	'''
	Prova model is using GenericForeignKey so that is not tied to a unique parent model.
	This is necessary because we have provas for both Avaluacio and Dimensio classes.
	'''
	nom 			= models.CharField(max_length=120)
	data 			= models.DateField(auto_now=False, auto_now_add=False, default=now)
	continguts		= models.TextField(blank=True, null=True)
	content_type 	= models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id 		= models.PositiveIntegerField()
	content_object 	= GenericForeignKey('content_type', 'object_id')
	pes_total 		= models.FloatField()
	nota_total 		= models.FloatField()
	nota_mitja 		= models.FloatField(blank=True, null=True)
	objects 		= ProvaManager()

	@property
	def notes_prova(self):
		instance = self
		qs = Nota.objects.filter_by_instance(instance)
		return qs

	def __unicode__(self):
		return str(self.nom)

	def __str__(self):
		return str(self.nom)



class NotaManager(models.Manager):

	def filter_by_instance(self, instance):
		content_type = ContentType.objects.get_for_model(instance.__class__)
		obj_id = instance.id
		qs = super(NotaManager, self).filter(content_type=content_type, object_id=obj_id)
		return qs


class Nota(models.Model):

	nota 			= models.FloatField(null=False)
	alumne 			= models.ForeignKey('alumnes.Alumne', related_name='alumne', blank=True, null=True)
	content_type 	= models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id 		= models.PositiveIntegerField()
	content_object 	= GenericForeignKey('content_type', 'object_id')
	objects			= NotaManager()

	# @property
	# def dimensio(self, obj):
	# 	instance = self
	# 	qs = Dimensio.filter_by_instance(instance)
	# 	return qs

	def __unicode__(self):
		return str(self.nota)
		# return "%s - %s" % (self.alumne.nom, self.nota)

	def save(self, *args, **kwargs):
		super(Nota, self).save(*args, **kwargs)

	@classmethod
	def create_notes_new_alumne(cls, sender, instance, created, **kwargs):

		assignatures_qs = instance.assignatures.all()

		# for each assignatura
		for assignatura_obj in assignatures_qs:
			avaluacio_qs = assignatura_obj.assignatura_avaluacions.all()
			# for each avaluacui
			for avaluacio_obj in avaluacio_qs:
				dimensio_qs = avaluacio_obj.dimensions_avaluacio.all()
				# for each dimensio
				for dimensio_obj in dimensio_qs:

					# check whether there is an actual Nota for this student
					notes_qs = dimensio_obj.notes()
					is_nota_alumne = False
					for nota_obj in notes_qs:
						if nota_obj.alumne == instance:
							is_nota_alumne = True
					# if there is none, create a new one
					if is_nota_alumne == False:
						print(dimensio_obj)
						dimensio_content_type = ContentType.objects.get_for_model(dimensio_obj.__class__)
						Nota.objects.create(
							nota 			= 0,
							content_type	= dimensio_content_type,
							object_id 		= dimensio_obj.id,
							alumne 			= instance,
							)


post_save.connect(receiver=Nota.create_notes_new_alumne, sender=Alumne)


# post_save.connect(receiver=Prova.recalculate_params, sender=Nota)

# post_save.connect(receiver=Prova.recalculate_params, sender=Prova)

# post_delete.connect(receiver=Prova.recalculate_params, sender=Nota)

# post_delete.connect(receiver=Prova.recalculate_params, sender=Prova)

# post_save.connect(receiver=Prova.create_prova_final_avaluacio,sender=Avaluacio)

# post_save.connect(receiver=Avaluacio.recalculate_proves_avaluacio,sender=Nota)