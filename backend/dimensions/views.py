from rest_framework.generics import (
	CreateAPIView,
	ListAPIView, 
	RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status

from .models import Dimensio
from .serializers import (
	DimensioCreateUpdateSerializer,
	DimensioDetailSerializer,
	DimensioListSerializer
	)
from rest_framework.mixins import CreateModelMixin


# We are here using a model mixin because we want to return
# the id of the saved instance to the frontend 

class DimensioCreateMixin(CreateModelMixin):
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()

class DimensioCreateView(CreateAPIView, CreateModelMixin):
	permission_classes = [IsAuthenticated]
	queryset = Dimensio.objects.all()
	serializer_class = DimensioCreateUpdateSerializer
	

class DimensioListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Dimensio.objects.all()
	serializer_class = DimensioListSerializer


class DimensioDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Dimensio.objects.all()
	serializer_class = DimensioDetailSerializer
