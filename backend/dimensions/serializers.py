from rest_framework.serializers import (
	Field,
	IntegerField,
	FloatField,
	HyperlinkedIdentityField,
	HyperlinkedModelSerializer,
	HyperlinkedRelatedField,
	ModelSerializer, 
	PrimaryKeyRelatedField,
	SerializerMethodField
	)

from alumnes.serializers import AlumneListSerializer
from proves.serializers import ProvaListSerializer, NotaListSerializer, NotaDetailSerializer

from .models import Dimensio

# Dimensio
# ------------------------------------------------------------------------

class DimensioCreateUpdateSerializer(ModelSerializer):
	class Meta:
		model = Dimensio
		fields = [
			'id',
			'nom',
			'data',
			'nota_total',
			'pes_total',
			'avaluacio'
		]


class DimensioListSerializer(ModelSerializer):

	notes_count = IntegerField(
		source='notes.count', 
		read_only=True
	)
	# url_detail 		= HyperlinkedIdentityField(view_name='dimensions-api:dimensio-detail', lookup_field='pk')
	notes 			= NotaListSerializer(many=True)
	subdimensions 	= SerializerMethodField()
	# proves 			= SerializerMethodField()

	class Meta:
		model = Dimensio
		fields = [
			'id',
			'nom',
			'data',
			# 'avaluacio',
			'pes_total',
			'nota_mitja',
			'notes_count',
			'nota_total',
			'notes',
			# 'proves',
			'subdimensions',
		]

	# Serialize subdimensions data
	def get_subdimensions(self, obj):
		qs = obj.subdimensions.all()
		if qs.exists():
			return DimensioListSerializer(qs, many=True).data
		return None

	# def get_proves(self, obj):
	# 	qs = obj.proves.all()
	# 	if qs.exists():
	# 		return ProvaListSerializer(qs, many=True).data
	# 	return None



class DimensioDetailSerializer(ModelSerializer):

	notes_count = IntegerField(
		source='notes.count', 
		read_only=True
	)

	# notes_dimensio = HyperlinkedRelatedField(many=True, view_name='proves-api:nota-detail', read_only=True) # Hyperlinked Identity Field

	notes = NotaDetailSerializer(many=True)
	avaluacio = PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = Dimensio
		fields = [
			'id',
			'nom',
			'data',
			'nota_total',
			'nota_mitja',
			'notes_count',
			'notes',
			'pes_total',
			'avaluacio',
		]