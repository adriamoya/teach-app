from django.conf.urls import url
from django.contrib import admin

from .views import AlumneListView, AlumneDetailView


urlpatterns = [
	url(r'^$', AlumneListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', AlumneDetailView.as_view(), name='detail'),
]