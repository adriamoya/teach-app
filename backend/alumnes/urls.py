from django.conf.urls import url
from django.contrib import admin

from .views import AlumneCreateView, AlumneListView, AlumneDetailView


urlpatterns = [
	url(r'^add/$', AlumneCreateView.as_view(), name='create'),
	url(r'^$', AlumneListView.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', AlumneDetailView.as_view(), name='detail'),
]