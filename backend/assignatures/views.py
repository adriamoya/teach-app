from rest_framework.generics import (
	CreateAPIView,
	ListAPIView,
	RetrieveUpdateDestroyAPIView)

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Assignatura
from .serializers import (
	AssignaturaCreateUpdateSerializer,
	AssignaturaDetailSerializer,
	AssignaturaListSerializer)

from django.http import request


class AssignaturaCreateView(CreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Assignatura.objects.all()
	serializer_class = AssignaturaCreateUpdateSerializer

	def perform_create(self, serializer):
		serializer.save()


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
