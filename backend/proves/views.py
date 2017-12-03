from rest_framework.generics import (
	CreateAPIView,
	ListAPIView, 
	RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Nota, Prova
from .serializers import (
	NotaCreateUpdateSerializer,
	NotaDetailSerializer, 
	NotaListSerializer,
	ProvaCreateUpdateSerializer,
	ProvaDetailSerializer,
	ProvaListSerializer
	)


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


class ProvaCreateView(CreateAPIView):
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

