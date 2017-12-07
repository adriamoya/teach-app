from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Alumne
from .serializers import AlumneCreateSerializer, AlumneListSerializer, AlumneDetailSerializer


class AlumneCreateView(CreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Alumne.objects.all()
	serializer_class = AlumneCreateSerializer
	

class AlumneListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Alumne.objects.all()
	serializer_class = AlumneListSerializer


class AlumneDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Alumne.objects.all()
	serializer_class = AlumneDetailSerializer