from . import views
from django.urls import path
from rest_framework import routers  
                
router = routers.DefaultRouter()  
router.register(r'result', views.ResultView, 'result')                   

urlpatterns = router.urls