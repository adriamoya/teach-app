from django.contrib import admin

from .models import Assignatura

# Register your models here.

class AssignaturaModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
	 	'curs',
	]

	search_fields = [
		'curs',
	]

	class Meta:
		model = Assignatura

admin.site.register(Assignatura, AssignaturaModelAdmin)
