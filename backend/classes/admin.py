from django.contrib import admin

from .models import Classe

# Register your models here.

# class ProfessorInline(admin.TabularInline):
# 	model = Classe.professors.through

class ClasseModelAdmin(admin.ModelAdmin):
	
	list_display = [
		'__str__',
		'nom',
		'curs',
	]

	# inlines = [
	# 	ProfessorInline,
	# ]

	search_fields = [
		'curs',
	]

	class Meta:
		model = Classe

admin.site.register(Classe, ClasseModelAdmin)