from django.db import models
from django.core.urlresolvers import reverse


from assignatures.models import Assignatura
# from classes.models import Classe

# Create your models here.

class AlumneManager(models.Manager):
	def filter_by_instance(self, instance):
		obj_id = instance.id
		qs = super(AlumneManager, self).filter(id=obj_id)
		return qs


class Alumne(models.Model):

	nom 			= models.CharField(max_length=120, blank=True)
	primer_cognom 	= models.CharField(max_length=120, blank=True)
	segon_cognom 	= models.CharField(max_length=120, blank=True)
	email 			= models.EmailField(null=True, blank=True)
	bio 			= models.TextField(max_length=500, blank=True)
	lloc 			= models.CharField(max_length=30, blank=True)
	data_naixement 	= models.DateField(null=True, blank=True)
	classe 			= models.ForeignKey('classes.Classe', related_name='alumne_classe',blank=True, null=True)
	assignatures 	= models.ManyToManyField('assignatures.Assignatura', related_name='alumne_assignatures', blank=True)
	objects 		= AlumneManager()

	def get_assignatures(self):
		return self.assignatures.all()

	def get_assignatura_detail_url(self):
		return reverse("assignatures-api:detail", kwargs={"pk": self.id})

	def __unicode__(self):
		return "%s %s %s" % (self.nom, self.primer_cognom, self.segon_cognom)

	# def __unicode__(self):
	# 	return "%s %s %s" % (self.nom, self.primer_cognom, self.segon_cognom)



# class Store(models.Model):
#     name = CharField(max_length=30)
#     product = models.ManyToManyField(Product)

# class Product(models.Model):
#     name = CharField(max_length=30)

# stores_qs = Store.objects.filter(product__name='product_name')
# products = Product.objects.filter(store_set__in=stores_qs)