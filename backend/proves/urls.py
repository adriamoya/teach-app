from django.conf.urls import url
from django.contrib import admin

from .views import (
	NotaCreateView,
	NotaDetailView, 
	NotaListView,
	ProvaCreateView,
	ProvaDetailView, 
	ProvaListView
	)


urlpatterns = [
	url(r'^add/$', ProvaCreateView.as_view(), name='prova-add'),
	url(r'^$', ProvaListView.as_view(), name='prova-list'),
	url(r'^(?P<pk>[0-9]+)/$', ProvaDetailView.as_view(), name='prova-detail'),
	url(r'^notes/add/$', NotaCreateView.as_view(), name='nota-add'),
	url(r'^notes/$', NotaListView.as_view(), name='nota-list'),
	url(r'^notes/(?P<pk>[0-9]+)/$', NotaDetailView.as_view(), name='nota-detail'),
]