# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Curs

# Register your models here.

class CursModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
	]

	class Meta:
		model = Curs

admin.site.register(Curs, CursModelAdmin)