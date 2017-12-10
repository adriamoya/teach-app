from django.conf.urls import url
from django.contrib import admin

from .views import (
	AssignaturaCreateView,
	AssignaturaDetailView,
	AssignaturaListView,
	AvaluacioCreateView,
	AvaluacioDetailView,
	AvaluacioListView
	) 


urlpatterns = [
	url(r'^add/$', AssignaturaCreateView.as_view(), name='add'),
	url(r'^$', AssignaturaListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', AssignaturaDetailView.as_view(), name='detail'),
	url(r'^avaluacio/add/$', AvaluacioCreateView.as_view(), name='avaluacio-add'),
	url(r'^avaluacio/$', AvaluacioListView.as_view(), name='avaluacio-list'),
	url(r'^avaluacio/(?P<pk>[0-9]+)/$', AvaluacioDetailView.as_view(), name='avaluacio-detail'),
]