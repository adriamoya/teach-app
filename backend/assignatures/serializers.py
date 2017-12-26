from rest_framework.serializers import (
	IntegerField,
	ModelSerializer,
	HyperlinkedIdentityField,
	HyperlinkedRelatedField,
	HyperlinkedModelSerializer,
	PrimaryKeyRelatedField, 
	SerializerMethodField
	)

from .models import Assignatura, Avaluacio

from alumnes.serializers import AlumneListSerializer
from dimensions.serializers import DimensioListSerializer
from professors.serializers import ProfessorListSerializer
from proves.serializers import ProvaListSerializer



# Avaluacio
# ------------------------------------------------------------------------

class AvaluacioCreateSerializer(ModelSerializer):
	class Meta:
		model = Avaluacio
		fields = [
			'id',
			'nom',
			'assignatura'
		]

class AvaluacioListSerializer(ModelSerializer):
	"""
	List of all avaluacions available.

	"""
	url_detail =  HyperlinkedIdentityField(view_name='assignatures-api:avaluacio-detail', lookup_field='pk')
	proves_avaluacio = ProvaListSerializer(many=True, read_only=True)
	dimensions_avaluacio = DimensioListSerializer(many=True, read_only=True)
	# proves_assignatura = ProvaListSerializer(many=True)

	class Meta:
		model = Avaluacio
		fields = [
			'id',					
			'nom',					
			'proves_avaluacio',
			'dimensions_avaluacio',
			'assignatura',	
			'url_detail',	
		]

class AvaluacioDetailSerializer(ModelSerializer):

	proves_avaluacio = ProvaListSerializer(many=True, read_only=True)
	dimensions_avaluacio = DimensioListSerializer(many=True, read_only=True)
	#proves_assignatura = ProvaListSerializer(many=True)

	class Meta:
		model = Avaluacio
		fields = [
			'id',					
			'nom',					
			'proves_avaluacio',
			'dimensions_avaluacio',
			'assignatura',	
			#'url_detail',	
		]


# Assignatura
# ------------------------------------------------------------------------

class AssignaturaCreateSerializer(ModelSerializer):
	class Meta:
		model = Assignatura
		fields = [
			'id',
			'nom',
			'curs',
			'bio'
		]
		

class AssignaturaListSerializer(ModelSerializer):
	"""
	List of all assignatures available.

	"""
	url_detail =  HyperlinkedIdentityField(view_name='assignatures-api:detail', lookup_field='pk')
	# assignatura_avaluacions = AvaluacioListSerializer(many=True, read_only=True)
	# proves_assignatura = ProvaListSerializer(many=True)

	class Meta:
		model = Assignatura
		fields = [
			'id',					# id of assignatura
			'__unicode__',
			'nom',					# name of assignatura
			'assignatura_avaluacions',
			'curs',
			#'proves_assignatura',	# link to proves detail view
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
	# proves_assignatura = ProvaListSerializer(many=True, read_only=True)
	professor_assignatures = ProfessorListSerializer(many=True, read_only=True)
	alumne_assignatures = AlumneListSerializer(many=True, read_only=True)
	assignatura_avaluacions = AvaluacioListSerializer(many=True, read_only=True)
	# proves_assignatura = HyperlinkedRelatedField(many=True, view_name='proves-api:prova-detail', read_only=True)

	class Meta:
		model = Assignatura
		fields = [
			'id',						# id of assignatura
			'nom',						# name of assignatura
			'curs',					# curs of assignatura
			'bio',
			'alumne_count',				# count of alumnes in assignatura
			'professor_assignatures',	# professor info in assignatura
			'assignatura_avaluacions',
			#'proves_assignatura',		# link to prova detail view
			'alumne_assignatures'
		]

