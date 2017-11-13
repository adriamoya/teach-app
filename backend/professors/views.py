# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from teach.permissions import IsOwnerOrReadOnly

from .serializers import ProfessorListSerializer, ProfessorDetailSerializer
from .models import Professor

# Create your views here.


class ProfessorList(ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Professor.objects.all()
	serializer_class = ProfessorListSerializer

class ProfessorDetail(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsOwnerOrReadOnly]
	queryset = Professor.objects.all()
	serializer_class = ProfessorDetailSerializer

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
