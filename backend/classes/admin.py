from django.contrib import admin

from .models import Classe

# Register your models here.

# class ProfessorInline(admin.TabularInline):
# 	model = Classe.professors.through

class ClasseModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		'nom',
	]

	# inlines = [
	# 	ProfessorInline,
	# ]

	# search_fields = [
	# 	'curs',
	# ]

	class Meta:
		model = Classe
		fields = [
			'id',
			'nom',
			'curs',
			'assignatures',
			'alumnes'
		]

admin.site.register(Classe, ClasseModelAdmin)