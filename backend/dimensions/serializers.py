from rest_framework.serializers import (
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

	# dimensio_notes = HyperlinkedRelatedField(many=True, view_name='dimensions-api:nota-detail', read_only=True) # Hyperlinked Identity Field
	url_detail =  HyperlinkedIdentityField(view_name='dimensions-api:dimensio-detail', lookup_field='pk')
	notes_dimensio = Nota_DimensioListSerializer(many=True)
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
			'avaluacio',
			'pes_total',
			'url_detail'
		]


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