# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import pre_save
from django.contrib.auth.models import User


class Professor(models.Model):
	user 			= models.OneToOneField(User, on_delete=models.CASCADE)
	nom 			= models.CharField(max_length=120, blank=True)
	primer_cognom 	= models.CharField(max_length=120, blank=True)
	segon_cognom 	= models.CharField(max_length=120, blank=True)
	bio 			= models.TextField(max_length=500, blank=True)
	lloc 			= models.CharField(max_length=30, blank=True)
	data_naixement	= models.DateField(null=True, blank=True)
	assignatures 	= models.ManyToManyField('assignatures.Assignatura', related_name='professor_assignatures', blank=True)
	email			= models.EmailField(null=True, blank=True)
	owner 			= models.ForeignKey('auth.User', related_name='professors', on_delete=models.CASCADE)

	def __unicode__(self):
		return "%s %s %s" % (self.nom, self.primer_cognom, self.segon_cognom)

	# def __unicode__(self):
	# 	return "%s %s %s" % (self.nom, self.primer_cognom, self.segon_cognom)



# def pre_save_professor_receiver(sender, instance, *args, **kwargs):

# 	print(instance.id)
# 	qs = User.objects.filter(id=instance.id).values('email').first()
# 	instance.email = qs['email']


# pre_save.connect(pre_save_professor_receiver, sender=Professor)


















"""
	from django.db import models

	# Create your models here.

	from django.contrib.auth.models import User

	class Professor(User):

		class Meta:
			proxy = True
			ordering = ('first_name', )
"""