from django.conf.urls import url
from django.contrib import admin

from .views import (
	AssignaturaCreateView,
	AssignaturaDetailView,
	AssignaturaListView
	) 


urlpatterns = [
	url(r'^add/$', AssignaturaCreateView.as_view(), name='add'),
	url(r'^$', AssignaturaListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', AssignaturaDetailView.as_view(), name='detail'),
]