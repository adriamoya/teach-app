from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Classe
from .serializers import ClasseCreateSerializer, ClasseListSerializer, ClasseDetailSerializer
from rest_framework.mixins import CreateModelMixin


# We are here using a model mixin because we want to return
# the id of the saved instance to the frontend 

class ClasseCreateMixin(CreateModelMixin):
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()


class ClasseCreateView(CreateAPIView, CreateModelMixin):
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
