from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
	return Response({
		'alumnes': reverse('alumnes-api:list', request=request, format=format),
		'assignatures': reverse('assignatures-api:list', request=request, format=format),
		'classes': reverse('classes-api:list', request=request, format=format),
		'cursos': reverse('cursos-api:list', request=request, format=format),
		'proves': reverse('proves-api:prova-list', request=request, format=format),
		'professors': reverse('professors-api:list', request=request, format=format),
	})