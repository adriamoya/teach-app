from django.contrib import admin

from .models import Dimensio

# Register your models here.

	
class DimensioModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		'avaluacio',
		'pes_total',
		'nota_total'
	]

	class Meta:
		model = Dimensio

admin.site.register(Dimensio, DimensioModelAdmin)
