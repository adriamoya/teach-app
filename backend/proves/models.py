from django.db import models
from django.db.models.signals import post_save
from django.utils.timezone import now

import numpy as np


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

	# this method is triggered after a nota is assigned to a prova (post_save signal)
	@classmethod
	def recalculate_params(cls, sender, instance, created, **kwargs):
		# grab the current instance of Prova
		prova_id = instance.prova.id # get the id
		qs = Prova.objects.filter(id = prova_id) # filter Prova objects by this id
		
		# we should only get one object (prova)
		if qs.exists():
			prova_obj = qs.first()

			notes = prova_obj.notes_prova.all() # calculate the mean of all the notes of this prova
			print(notes)

			# wraps all the notes in an array in order to use numpy
			notes_array = []
			for nota in notes:
				notes_array.append(nota.nota)

			nota_mitja = np.mean(notes_array) # calculating the mean of all the notes
			print(nota_mitja)

			prova_obj.nota_mitja = nota_mitja # assigning this mean to the filtered prova
			prova_obj.save() #saving the object


class Nota(models.Model):

	nota 		= models.FloatField()
	prova 		= models.ForeignKey('Prova', related_name='notes_prova', blank=True)
	alumne 		= models.ForeignKey('alumnes.Alumne', related_name='nota_alumne', blank=True, null=True)

	def __unicode__(self):
		return "%s - %s %s - %s" % (self.prova, self.alumne.nom, self.alumne.primer_cognom, self.nota)


post_save.connect(receiver=Prova.recalculate_params,sender=Nota)