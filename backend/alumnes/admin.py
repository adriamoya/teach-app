from django.contrib import admin

from .models import Alumne

# Register your models here.

class AlumneModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		'email',
		'classe',
	]

	search_fields = [
		'classe',
	]

	class Meta:
		model = Alumne

admin.site.register(Alumne, AlumneModelAdmin)