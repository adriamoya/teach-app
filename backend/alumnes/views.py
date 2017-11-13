from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Alumne
from .serializers import AlumneListSerializer, AlumneDetailSerializer


class AlumneListView(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Alumne.objects.all()
	serializer_class = AlumneListSerializer


class AlumneDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Alumne.objects.all()
	serializer_class = AlumneDetailSerializer
