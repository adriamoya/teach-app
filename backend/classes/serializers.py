from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField

from .models import Classe

# from alumnes.models import Alumne
from alumnes.serializers import AlumneListSerializer
from assignatures.serializers import AssignaturaListSerializer


class ClasseCreateSerializer(ModelSerializer):
	class Meta:
		model = Classe
		fields = [
			'id',
			'nom',
			'curs',
			# 'assignatures'
			]


class ClasseListSerializer(ModelSerializer):
	url_detail =  HyperlinkedIdentityField(view_name='classes-api:detail', lookup_field='pk')
	class Meta:
		model = Classe
		fields = [
			'id',
			'__unicode__',
			'nom',
			'curs',
			'url_detail',
			'alumne_classe',
			# 'assignatures'
		]

class ClasseDetailSerializer(ModelSerializer):
	alumne_classe = AlumneListSerializer(many=True, read_only=True)
	# assignatures = AssignaturaListSerializer(many=True)
	class Meta:
		model = Classe
		fields = [
			'id',
			'nom',
			'curs',
			'alumne_classe',
			'__unicode__'
			# 'assignatures'
		]