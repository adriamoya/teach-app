from django.contrib import admin

from .models import Assignatura, Avaluacio

# Register your models here.

class AssignaturaModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
	]

	class Meta:
		model = Assignatura

admin.site.register(Assignatura, AssignaturaModelAdmin)


class AvaluacioModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
	]

	class Meta:
		model = Avaluacio

admin.site.register(Avaluacio, AvaluacioModelAdmin)
