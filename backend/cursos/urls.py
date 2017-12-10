from django.conf.urls import url
from django.contrib import admin

from .views import CursCreateView, CursListView, CursDetailView


urlpatterns = [
	url(r'^add/$', CursCreateView.as_view(), name='create'),
	url(r'^$', CursListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', CursDetailView.as_view(), name='detail'),
]