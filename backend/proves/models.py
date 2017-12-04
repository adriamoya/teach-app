from django.db import models
from django.utils.timezone import now

# Create your models here.


class Prova(models.Model):

	nom 		= models.CharField(max_length=120)
	# curs 		= models.PositiveIntegerField()
	nota_total 	= models.FloatField()
	pes_total 	= models.FloatField()
	assignatura = models.ForeignKey('assignatures.Assignatura', related_name='proves_assignatura',blank=True, null=True)
	data 		= models.DateField(auto_now=False, auto_now_add=False, default=now)
	continguts	= models.TextField(blank=True, null=True)

	def __unicode__(self):
		return "%s" % (self.nom)

	# def __unicode__(self):
	# 	return "%s" % (self.nom)


class Nota(models.Model):

	nota 		= models.FloatField()
	prova 		= models.ForeignKey('Prova', related_name='notes_prova', blank=True)
	alumne 		= models.ForeignKey('alumnes.Alumne', related_name='nota_alumne', blank=True, null=True)

	def __unicode__(self):
		return "%s - %s %s - %s" % (self.prova, self.alumne.nom, self.alumne.primer_cognom, self.nota)

	# def __unicode__(self):
	# 	return "%d" % (self.nota)