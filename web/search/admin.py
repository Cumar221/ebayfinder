from django.contrib import admin
from .models import Search, Notification

class SearchAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'site', 'category', 'minPrice', 'maxPrice', 'keyword')
    
admin.site.register(Search, SearchAdmin)
admin.site.register(Notification)