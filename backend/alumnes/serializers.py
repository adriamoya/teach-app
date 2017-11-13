from rest_framework.serializers import (
	HyperlinkedIdentityField, 
	ModelSerializer, 
	SerializerMethodField
	)
 
from .models import Alumne

from assignatures.models import Assignatura


# Alumne
# ------------------------------------------------------------------------

class AlumneListSerializer(ModelSerializer):
	"""
	List of all alumnes available.

	"""
	url_detail =  HyperlinkedIdentityField(view_name='alumnes-api:detail', lookup_field='pk')

	class Meta:
		model = Alumne
		fields = [
			'nom', 				# name of alumne
			'primer_cognom',	# first surname
			'segon_cognom',		# second surname
			'url_detail',		# link alumne detail view
		]


class AlumneDetailSerializer(ModelSerializer):
	"""
	Detail of a particular alumne.

		- Links to its assignatures.

	Deprecated

		Circular dependency in Django Rest Framework serializers.

		https://stackoverflow.com/questions/33413523/circular-dependency-in-django-rest-framework-serializers

		Instead of serializing the assignatures from a particular alumne, 
		I have created two get methods within the Alumne model:

			- get_assignatures(): return a queryset with all the assignatures from the alumne.
			- get_absolute_url(): for a particular instance, return the detail url view with a reverse relationship.

	Note

		I could not get the host url in order to append it to the get_absolute_url (relative).
		Right now the local host is introduced manually.
	"""
	assignatures_url = SerializerMethodField()
	nota_alumne = HyperlinkedIdentityField(view_name='proves-api:nota-detail', lookup_field='pk')

	class Meta:
		model = Alumne
		fields = [
			'nom',
			'primer_cognom',
			'segon_cognom',
			'email',
			'bio',
			'lloc',
			'data_naixement',
			'assignatures_url',
			'assignatures',
			'nota_alumne',
			# 'alumne_assignatures'
		]

	def get_assignatures_url(self, obj):
		detail_urls = []
		qs = obj.get_assignatures()
		for assignatura in qs:
			detail_url = assignatura.get_absolute_url()
			detail_urls.append("http://127.0.0.1:8000"+detail_url)		# CHANGE !!
		return 	detail_urls


	"""
	Deprecated 
	
	alumne_assignatures = SerializerMethodField()

	def get_alumne_assignatures(self, obj):
		from assignatures.serializers import AssignaturaListSerializer
		qs = obj.get_assignatures().first()
		return AssignaturaListSerializer(qs, many=False).data
	"""