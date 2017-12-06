from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField

from .models import Classe

# from alumnes.models import Alumne
from alumnes.serializers import AlumneListSerializer
from assignatures.serializers import AssignaturaListSerializer


class ClasseCreateSerializer(ModelSerializer):
	class Meta:
		model = Classe
		fields = [
			'nom',
			'assignatures',
			'alumnes'
			]


class ClasseListSerializer(ModelSerializer):
	url_detail =  HyperlinkedIdentityField(view_name='classes-api:detail', lookup_field='pk')
	class Meta:
		model = Classe
		fields = [
			'id',
			'nom',
			'assignatures',
			'url_detail'
		]

class ClasseDetailSerializer(ModelSerializer):
	alumnes = AlumneListSerializer(many=True)
	assignatures = AssignaturaListSerializer(many=True)
	class Meta:
		model = Classe
		fields = [
			'id',
			'nom',
			'curs',
			'assignatures',
			'alumnes'
		]
