from rest_framework.serializers import (
	ModelSerializer, 
	HyperlinkedIdentityField, 
	ReadOnlyField, 
	SerializerMethodField
	)

from .models import Professor
from django.contrib.auth.models import User


class ProfessorListSerializer(ModelSerializer):

	url_detail =  HyperlinkedIdentityField(view_name='professors-api:detail', lookup_field='pk')

	class Meta:
		model = Professor
		fields = [
			'nom', 
			'primer_cognom', 
			'url_detail'
		]


class ProfessorDetailSerializer(ModelSerializer):

	owner = ReadOnlyField(source='owner.username')

	class Meta:
		model = Professor
		fields = [
			'id', 
			'nom', 
			'primer_cognom', 
			'segon_cognom', 
			'bio', 
			'data_naixement',
			'email',
			'owner',
		]

