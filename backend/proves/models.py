from django.db import models
from django.db.models.signals import post_save
from django.utils.timezone import now

import numpy as np

from assignatures.models import Avaluacio
from alumnes.models import Alumne

# Create your models here.


class Prova(models.Model):

	nom 		= models.CharField(max_length=120)
	data 		= models.DateField(auto_now=False, auto_now_add=False, default=now)
	continguts	= models.TextField(blank=True, null=True)
	avaluacio 	= models.ForeignKey('assignatures.Avaluacio', related_name='proves_avaluacio',blank=True, null=True)
	pes_total 	= models.FloatField()
	nota_total 	= models.FloatField()
	nota_mitja 	= models.FloatField(blank=True, null=True)
	# assignatura = models.ForeignKey('assignatures.Assignatura', related_name='proves_assignatura',blank=True, null=True)

	def __unicode__(self):
		return "%s" % (self.nom)

	@classmethod
	def create_prova_final_avaluacio(cls, sender, instance, created, **kwargs):
		'''
		This method is triggered after post_save of an Avaluacio instance.
		It creates a Prova instance (Total) that will wrap up all the notes
		from the various proves linked to that avaluacio.
		In addition, inizialization of the notes that populate the Total prova
		is required to reserve some id in the db.
		'''

		# retrieve Avaluacio instance passed by post_save method (sender)
		avaluacio_id = instance.id
		avaluacio_obj = Avaluacio.objects.filter(id = avaluacio_id).first() # retrieve newly created avaluacio instance 
		
		# create the Total prova instance
		prova_avaluacio = Prova.objects.create(
			nom 		= "Total avaluacio",
			avaluacio 	= avaluacio_obj,
			pes_total	= 1,
			nota_total	= 10,
			)

		# retrieve id of Total prova
		prova_avaluacio_obj = Prova.objects.filter(avaluacio = avaluacio_id).first()
		# print(prova_avaluacio_obj.id)

		# retrieve alumnes from avaluacio (assignatura)
		qs_alumnes = Avaluacio.get_alumnes(avaluacio_obj)
		# print(qs_alumnes)

		for alumne_obj in qs_alumnes:
			Nota.objects.create(
				nota 	= 0,
				alumne 	= alumne_obj,
				prova 	= prova_avaluacio_obj
			)


	# this method is triggered after a nota is assigned to a prova (post_save signal)
	@classmethod
	def recalculate_params(cls, sender, instance, created, **kwargs):
		'''
		This method is triggered after post_save of a Nota instance.
		It is meant to do the following:
			-	Recalculate the mean (nota_mitja) of the prova linked to the nota created/changed.
			-	Update the prova_avaluacio with the new notes
		'''

		if sender == Nota:
			# grab the current instance of Prova
			prova_id = instance.prova.id # get the id
			qs = Prova.objects.filter(id = prova_id) # filter Prova objects by this id

			prova_obj = qs.first()

		elif sender == Prova:
			prova_obj = instance

		qs_notes = prova_obj.notes_prova.all() # calculate the mean of all the notes of this prova

		# wraps all the notes in an array in order to use numpy
		notes_array = []
		for nota in qs_notes:
			notes_array.append(nota.nota)

		nota_mitja = np.mean(notes_array) # calculating the mean of all the notes
		# print(nota_mitja)

		# assigning this mean to the filtered prova
		# It is important to note that we are using update() method instead of .save() to avoid
		# recursion with post_save method. To use .update() it is necessary to pass in a queryset (qs_prova),
		# not the object (prova_obj)
		qs_prova = Prova.objects.filter(id = prova_obj.id).update(nota_mitja=nota_mitja)

		# Recalculate the final notes for the corresponding avaluacio
		pes_total, notes_avaluacio, prova_avaluacio_obj, qs_alumnes_avaluacio = Avaluacio.recalculate_notes_avaluacio(prova_obj.avaluacio)

		# updating the total weight of the prova_avaluacio (based on the weights of individuals proves)
		qs_prova = Prova.objects.filter(id = prova_avaluacio_obj.id).update(pes_total=pes_total)

		for alumne_obj in qs_alumnes_avaluacio:
			nota = [nota["nota"] for nota in notes_avaluacio if nota["alumne"] == alumne_obj.id][0]
			qs_nota = Nota.objects.filter(alumne = alumne_obj).filter(prova = prova_avaluacio_obj).update(nota=nota)


class Nota(models.Model):

	nota 		= models.FloatField()
	prova 		= models.ForeignKey('Prova', related_name='notes_prova', blank=True)
	alumne 		= models.ForeignKey('alumnes.Alumne', related_name='nota_alumne', blank=True, null=True)

	def __unicode__(self):
		return "%s - %s %s - %s" % (self.prova, self.alumne.nom, self.alumne.primer_cognom, self.nota)


	def save(self, *args, **kwargs):
		super(Nota, self).save(*args, **kwargs)


post_save.connect(receiver=Prova.recalculate_params,sender=Nota)

post_save.connect(receiver=Prova.recalculate_params,sender=Prova)

post_save.connect(receiver=Prova.create_prova_final_avaluacio,sender=Avaluacio)

# post_save.connect(receiver=Avaluacio.recalculate_notes_avaluacio,sender=Nota)