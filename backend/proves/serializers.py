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

from .models import Nota, Prova


class NotaListSerializer(ModelSerializer):

	url_detail =  HyperlinkedIdentityField(view_name='proves-api:nota-detail', lookup_field='pk')
	alumne = AlumneListSerializer(many=False)

	class Meta:
		model = Nota
		fields = [
			'nota',
			'alumne',
			'url_detail',
		]


class NotaDetailSerializer(ModelSerializer):

	alumne = AlumneListSerializer(many=False)

	class Meta:
		model = Nota
		fields = [
			'nota',
			'alumne',
		]


class ProvaListSerializer(ModelSerializer):

	notes_count = IntegerField(
		source='notes_prova.count', 
		read_only=True
	)

	# notes_prova = HyperlinkedRelatedField(many=True, view_name='proves-api:nota-detail', read_only=True) # Hyperlinked Identity Field

	notes_prova = NotaListSerializer(many=True)
	assignatura = PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = Prova
		fields = [
			'nom',
			'data',
			'nota_total',
			'notes_count',
			'notes_prova',
			'assignatura',
		]


class ProvaDetailSerializer(ModelSerializer):

	notes_count = IntegerField(
		source='notes_prova.count', 
		read_only=True
	)

	# notes_prova = HyperlinkedRelatedField(many=True, view_name='proves-api:nota-detail', read_only=True) # Hyperlinked Identity Field

	notes_prova = NotaListSerializer(many=True)
	assignatura = PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = Prova
		fields = [
			'nom',
			'data',
			'nota_total',
			'notes_count',
			'notes_prova',
			'assignatura',
		]