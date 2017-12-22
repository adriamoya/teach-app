from django.conf.urls import url
from django.contrib import admin

from .views import (
	Nota_DimensioCreateView,
	Nota_DimensioDetailView, 
	Nota_DimensioListView,
	DimensioCreateView,
	DimensioDetailView, 
	DimensioListView
	)


urlpatterns = [
	url(r'^add/$', DimensioCreateView.as_view(), name='dimensio-add'),
	url(r'^$', DimensioListView.as_view(), name='dimensio-list'),
	url(r'^(?P<pk>[0-9]+)/$', DimensioDetailView.as_view(), name='dimensio-detail'),
	url(r'^notes/add/$', Nota_DimensioCreateView.as_view(), name='nota-add'),
	url(r'^notes/$', Nota_DimensioListView.as_view(), name='nota-list'),
	url(r'^notes/(?P<pk>[0-9]+)/$', Nota_DimensioDetailView.as_view(), name='nota-detail'),
]