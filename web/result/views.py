from django.shortcuts import render
from rest_framework import viewsets       
from .serializers import ResultSerializer    
from .models import Result                     

class ResultView(viewsets.ModelViewSet):       
    serializer_class = ResultSerializer

    def get_queryset(self):
        user = self.request.user
        return Result.objects.filter(user=user)         
    