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
from proves.serializers import ProvaListSerializer

from .models import Nota_Dimensio, Dimensio


# Nota
# ------------------------------------------------------------------------

class Nota_DimensioCreateUpdateSerializer(ModelSerializer):
	class Meta:
		model = Nota_Dimensio
		fields = [
			'nota',
			'alumne',
			'dimensio'
		]


class Nota_DimensioListSerializer(ModelSerializer):

	url_detail =  HyperlinkedIdentityField(view_name='dimensions-api:nota-detail', lookup_field='pk')
	# alumne = AlumneListSerializer(many=False)

	class Meta:
		model = Nota_Dimensio
		fields = [
			'nota',
			'alumne',
			'url_detail',
			'dimensio'
		]


class Nota_DimensioDetailSerializer(ModelSerializer):

	url_detail =  HyperlinkedIdentityField(view_name='dimensions-api:nota-detail', lookup_field='pk')
	alumne = AlumneListSerializer(many=False)

	class Meta:
		model = Nota_Dimensio
		fields = [
			'nota',
			'alumne',
			'url_detail',
			'dimensio'
		]


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
		source='notes_dimensio.count', 
		read_only=True
	)
	# url_detail 		= HyperlinkedIdentityField(view_name='dimensions-api:dimensio-detail', lookup_field='pk')
	notes_dimensio 	= Nota_DimensioListSerializer(many=True)
	subdimensions 	= SerializerMethodField()
	proves 			= SerializerMethodField()

	class Meta:
		model = Dimensio
		fields = [
			'id',
			'nom',
			'data',
			'avaluacio',
			'pes_total',
			'nota_mitja',
			'notes_count',
			'nota_total',
			'notes_dimensio',
			'proves',
			'subdimensions',
			# 'url_detail'
		]

	# Serialize subdimensions data
	def get_subdimensions(self, obj):
		qs = obj.subdimensions.all()
		if qs.exists():
			return DimensioListSerializer(qs, many=True).data
		return None

	def get_proves(self, obj):
		qs = obj.proves.all()
		if qs.exists():
			return ProvaListSerializer(qs, many=True).data
		return None



class DimensioDetailSerializer(ModelSerializer):

	notes_count = IntegerField(
		source='notes_dimensio.count', 
		read_only=True
	)

	# notes_dimensio = HyperlinkedRelatedField(many=True, view_name='proves-api:nota-detail', read_only=True) # Hyperlinked Identity Field

	notes_dimensio = Nota_DimensioDetailSerializer(many=True)
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
			'notes_dimensio',
			'pes_total',
			'avaluacio',
		]