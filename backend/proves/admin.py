from django.contrib import admin

from .models import Prova, Nota

# Register your models here.

	
class ProvaModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		'assignatura'
	]

	class Meta:
		model = Prova

admin.site.register(Prova, ProvaModelAdmin)
admin.site.register(Nota)