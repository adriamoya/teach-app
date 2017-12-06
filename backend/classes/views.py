from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Classe
from .serializers import ClasseCreateSerializer, ClasseListSerializer, ClasseDetailSerializer


class ClasseCreateView(CreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Classe.objects.all()
	serializer_class = ClasseCreateSerializer

class ClasseListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Classe.objects.all()
	serializer_class = ClasseListSerializer

class ClasseDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Classe.objects.all()
	serializer_class = ClasseDetailSerializer
