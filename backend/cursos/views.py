# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status

from .models import Curs
from .serializers import CursCreateSerializer, CursListSerializer, CursDetailSerializer
from rest_framework.mixins import CreateModelMixin


# We are here using a model mixin because we want to return
# the id of the saved instance to the frontend 

class CursCreateMixin(CreateModelMixin):
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()


class CursCreateView(CreateAPIView, CreateModelMixin):
	permission_Curss = [IsAuthenticated]
	queryset = Curs.objects.all()
	serializer_class = CursCreateSerializer

class CursListView(ListAPIView):
	permission_Curss = [IsAuthenticated]
	queryset = Curs.objects.all()
	serializer_class = CursListSerializer

class CursDetailView(RetrieveUpdateDestroyAPIView):
	permission_Curss = [IsAuthenticated]
	queryset = Curs.objects.all()
	serializer_class = CursDetailSerializer
