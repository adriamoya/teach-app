from rest_framework.generics import (
	CreateAPIView,
	ListAPIView, 
	RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Nota, Prova
from .serializers import (
	NotaCreateUpdateSerializer,
	NotaDetailSerializer, 
	NotaListSerializer,
	ProvaCreateUpdateSerializer,
	ProvaDetailSerializer,
	ProvaListSerializer
	)
from rest_framework.mixins import CreateModelMixin


class NotaCreateView(CreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Nota.objects.all()
	serializer_class = NotaCreateUpdateSerializer

	def perform_create(self, serializer):
		serializer.save()


class NotaListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Nota.objects.all()
	serializer_class = NotaListSerializer


class NotaDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Nota.objects.all()
	serializer_class = NotaDetailSerializer


# We are here using a model mixin because we want to return
# the id of the saved instance to the frontend 

class ProvaCreateMixin(CreateModelMixin):
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()

class ProvaCreateView(CreateAPIView, CreateModelMixin):
	permission_classes = [IsAuthenticated]
	queryset = Prova.objects.all()
	serializer_class = ProvaCreateUpdateSerializer
	

class ProvaListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Prova.objects.all()
	serializer_class = ProvaListSerializer


class ProvaDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Prova.objects.all()
	serializer_class = ProvaDetailSerializer

