from rest_framework.generics import (
	CreateAPIView,
	ListAPIView,
	RetrieveUpdateDestroyAPIView)
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status

from .models import Assignatura
from .serializers import (
	AssignaturaCreateSerializer,
	AssignaturaDetailSerializer,
	AssignaturaListSerializer)

from django.http import request


class AssignaturaCreateMixin(CreateModelMixin):
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()


class AssignaturaCreateView(CreateAPIView, AssignaturaCreateMixin):
	permission_classes = [IsAuthenticated]
	queryset = Assignatura.objects.all()
	serializer_class = AssignaturaCreateSerializer


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
