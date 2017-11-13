from django.conf.urls import url
from django.contrib import admin

from .views import AssignaturaDetailView, AssignaturaListView


urlpatterns = [
	url(r'^$', AssignaturaListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', AssignaturaDetailView.as_view(), name='detail'),
]