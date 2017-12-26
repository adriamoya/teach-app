from django.contrib import admin

from .models import Prova, Nota

# Register your models here.

	
class ProvaModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		# 'avaluacio',
		'pes_total',
		'nota_total'
	]

	class Meta:
		model = Prova

admin.site.register(Prova, ProvaModelAdmin)


	
class NotaModelAdmin(admin.ModelAdmin):
	
	list_display = [
		# '__str__',
		'prova',
	]

	class Meta:
		model = Nota

admin.site.register(Nota, NotaModelAdmin)

