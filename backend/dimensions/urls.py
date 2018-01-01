from django.conf.urls import url
from django.contrib import admin

from .views import (
	DimensioCreateView,
	DimensioDetailView, 
	DimensioListView
	)


urlpatterns = [
	url(r'^add/$', DimensioCreateView.as_view(), name='dimensio-add'),
	url(r'^$', DimensioListView.as_view(), name='dimensio-list'),
	url(r'^(?P<pk>[0-9]+)/$', DimensioDetailView.as_view(), name='dimensio-detail')
]