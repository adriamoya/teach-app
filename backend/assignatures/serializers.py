from rest_framework.serializers import (
	IntegerField,
	ModelSerializer,
	HyperlinkedIdentityField,
	HyperlinkedRelatedField,
	HyperlinkedModelSerializer,
	PrimaryKeyRelatedField, 
	SerializerMethodField
	)

from .models import Assignatura

from alumnes.serializers import AlumneListSerializer
from professors.serializers import ProfessorListSerializer
from proves.serializers import ProvaListSerializer



# Assignatura
# ------------------------------------------------------------------------

class AssignaturaCreateUpdateSerializer(ModelSerializer):
	class Meta:
		model = Assignatura
		fields = [
			'nom',
			'curs',
			'bio'
		]
		

class AssignaturaListSerializer(HyperlinkedModelSerializer):
	"""
	List of all assignatures available.

	"""
	url_detail =  HyperlinkedIdentityField(view_name='assignatures-api:detail', lookup_field='pk')
	proves_assignatura = HyperlinkedRelatedField(many=True, view_name='proves-api:prova-detail', read_only=True)
	# proves_assignatura = ProvaListSerializer(many=True)

	class Meta:
		model = Assignatura
		fields = [
			'id',					# id of assignatura
			'nom',					# name of assignatura
			'proves_assignatura',	# link to proves detail view
			'url_detail', 			# link to assignatura detail view
		]


class AssignaturaDetailSerializer(ModelSerializer):
	"""
	Detail of a particular assignatura.

		- Links to its proves.
		- Link and info from professor.

	Deprecated

		alumne_assignatures = PrimaryKeyRelatedField(many=True, read_only=True)
		alumne_assignatures = AlumneListSerializer(many=True)
	
	"""

	# IMPORTANT: read_only=True in nested fields to avoid errors for CREATE, PUT methods from frontend

	alumne_count = IntegerField(
	    source='alumne_assignatures.count', # related_name - ManyToManyField
	    read_only=True
	)
	proves_assignatura = ProvaListSerializer(many=True, read_only=True)
	professor_assignatures = ProfessorListSerializer(many=True, read_only=True)
	alumne_assignatures = AlumneListSerializer(many=True, read_only=True)
	# proves_assignatura = HyperlinkedRelatedField(many=True, view_name='proves-api:prova-detail', read_only=True)

	class Meta:
		model = Assignatura
		fields = [
			'id',						# id of assignatura
			'nom',						# name of assignatura
			'curs',						# curs of assignatura
			'bio',
			'alumne_count',				# count of alumnes in assignatura
			'professor_assignatures',	# professor info in assignatura
			'proves_assignatura',		# link to prova detail view
			'alumne_assignatures'
		]

