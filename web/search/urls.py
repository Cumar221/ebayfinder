from . import views
from django.urls import path
from rest_framework import routers  
from django.conf.urls import url
          
router = routers.DefaultRouter()  
router.register(r'search', views.SearchView, 'search') 
router.register(r'notification', views.NotificationView, 'notification')                   

urlpatterns = router.urls