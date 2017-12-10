from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField

from .models import Curs

# from alumnes.models import Alumne
# from alumnes.serializers import AlumneListSerializer
from assignatures.serializers import AssignaturaListSerializer, AssignaturaDetailSerializer
from classes.serializers import ClasseListSerializer, ClasseDetailSerializer


class CursCreateSerializer(ModelSerializer):
	class Meta:
		model = Curs
		fields = [
			'id',
			'nom',
			]


class CursListSerializer(ModelSerializer):
	url_detail =  HyperlinkedIdentityField(view_name='cursos-api:detail', lookup_field='pk')
	# curs_assignatures = AssignaturaListSerializer(many=True, read_only=True)
	curs_classes = ClasseListSerializer(many=True, read_only=True)
	class Meta:
		model = Curs
		fields = [
			'id',
			'__unicode__',
			'curs_classes',
			'curs_assignatures',
			'url_detail'
		]

class CursDetailSerializer(ModelSerializer):
	curs_assignatures = AssignaturaDetailSerializer(many=True, read_only=True)
	curs_classes = ClasseDetailSerializer(many=True, read_only=True)
	class Meta:
		model = Curs
		fields = [
			'id',
			'curs_assignatures',
			'curs_classes'
		]