from django.conf.urls import url
from django.contrib import admin

from .views import ClasseCreateView, ClasseListView, ClasseDetailView


urlpatterns = [
	url(r'^add/$', ClasseCreateView.as_view(), name='create'),
	url(r'^$', ClasseListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', ClasseDetailView.as_view(), name='detail'),
]