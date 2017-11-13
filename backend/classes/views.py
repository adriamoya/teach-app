from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Classe
from .serializers import ClasseListSerializer


class ClasseListAPIView(ListAPIView):
	queryset = Classe.objects.all()
	serializer_class = ClasseListSerializer