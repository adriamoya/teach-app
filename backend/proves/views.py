from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Nota, Prova
from .serializers import (
	NotaDetailSerializer, 
	NotaListSerializer, 
	ProvaDetailSerializer,
	ProvaListSerializer
	)


class NotaListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Nota.objects.all()
	serializer_class = NotaListSerializer


class NotaDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Nota.objects.all()
	serializer_class = NotaDetailSerializer


class ProvaListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Prova.objects.all()
	serializer_class = ProvaListSerializer


class ProvaDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Prova.objects.all()
	serializer_class = ProvaDetailSerializer

