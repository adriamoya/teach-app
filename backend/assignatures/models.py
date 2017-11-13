from django.db import models
from django.core.urlresolvers import reverse

# Create your models here.

class AssignaturaManager(models.Manager):
	
	def filter_by_instance(self, instance):
		obj_id = instance.id
		qs = super(AssignaturaManager, self).filter(id= obj_id)
		return qs


class Assignatura(models.Model):

	nom 		= models.CharField(max_length=120)
	curs 		= models.PositiveIntegerField()
	objects		= AssignaturaManager()

	def get_absolute_url(self):
		return reverse("assignatures-api:detail", kwargs={"pk": self.id})

	def __unicode__(self):
		return "%s - %s" % (self.nom, self.curs)

	# def __unicode__(self):
	# 	return "%s - %s" % (self.nom, self.curs)
