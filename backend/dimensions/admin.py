from django.contrib import admin

from .models import Dimensio, Nota_Dimensio

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

	
class Nota_DimensioModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		'dimensio',
	]

	class Meta:
		model = Nota_Dimensio

admin.site.register(Nota_Dimensio, Nota_DimensioModelAdmin)

