from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Assignatura
from .serializers import AssignaturaDetailSerializer, AssignaturaListSerializer

from django.http import request

class AssignaturaListView(ListAPIView):
	permission_classes = [IsAuthenticatedOrReadOnly]
	queryset = Assignatura.objects.all()
	# serializer = AssignaturaListSerializer(queryset, context={'request': request})
	serializer_class = AssignaturaListSerializer


class AssignaturaDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Assignatura.objects.all()
	# serializer = AssignaturaDetailSerializer(queryset, context={'request': request})
	serializer_class = AssignaturaDetailSerializer
