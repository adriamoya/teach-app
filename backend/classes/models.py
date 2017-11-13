from django.db import models

# Create your models here.

class ClasseManager(models.Manager):
	def filter_by_instance(self, instance):
		obj_id = instance.id
		qs = super(ClasseManager, self).filter(id= obj_id)
		return qs


class Classe(models.Model):

	nom 			= models.CharField(max_length=120)
	curs 			= models.PositiveIntegerField()
	# professors 		= models.ManyToManyField('Professor', related_name='classe_professors', blank=True)
	# alumnes			= models.ManyToManyField('alumnes.Alumne', related_name='classe_alumnes', blank=True)
	objects			= ClasseManager()

	def __unicode__(self):
		return "Classe %s - %s" % (self.nom, self.curs)

	# def __str__(self):
	# 	return "Classe %s - %s" % (self.nom, self.curs)
