from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Classe

from alumnes.models import Alumne
from alumnes.serializers import AlumneListSerializer


class ClasseListSerializer(ModelSerializer):
	# professors = SerializerMethodField()
	# alumnes_count = SerializerMethodField()
	class Meta:
		model = Classe
		fields = [
			'id',
			'nom',
			'curs',
		]
