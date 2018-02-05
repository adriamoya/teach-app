from django.db import models

from assignatures.models import Assignatura


# Create your models here.

class ClasseManager(models.Manager):
	def filter_by_instance(self, instance):
		obj_id = instance.id
		qs = super(ClasseManager, self).filter(id= obj_id)
		return qs


class Classe(models.Model):

	nom 			= models.CharField(max_length=120)
	curs			= models.ForeignKey('cursos.Curs', related_name='curs_classes', blank=True, null=True)
	assignatures 	= models.ManyToManyField('assignatures.Assignatura', related_name='classe_assignatures', blank=True)
	# professors 		= models.ManyToManyField('Professor', related_name='classe_professors', blank=True)
	# alumnes			= models.ManyToManyField('alumnes.Alumne', related_name='classe_alumnes', blank=True)
	objects			= ClasseManager()

	def get_absolute_url(self):
		return reverse('classes-api:detail', kwargs={'pk': self.id})

	def get_assignatures(self):
		return self.assignatures.all()

	def get_assignatura_detail_url(self):
		return reverse('assignatures-api:detail', kwargs={'pk': self.id})

	def __unicode__(self):
		return 'Classe %s' % (unicode(self.nom))

	# def __unicode__(self):
	# 	return 'Classe %s - %s' % (unicode(self.nom), unicode(self.curs))

	# def __str__(self):
	# 	return 'Classe %s - %s' % (self.nom, self.curs)
