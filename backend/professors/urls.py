from django.conf.urls import url
from django.contrib import admin

from .views import ProfessorList, ProfessorDetail


urlpatterns = [
	url(r'^$', ProfessorList.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', ProfessorDetail.as_view(), name='detail'),
]