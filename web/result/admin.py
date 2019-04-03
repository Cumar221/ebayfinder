from django.contrib import admin
from .models import Result

class ResultAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'seller', 'url')
    
admin.site.register(Result, ResultAdmin)