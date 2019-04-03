from django.shortcuts import render
from rest_framework import viewsets  
from rest_framework import generics     
from .serializers import SearchSerializer, NotificationSerializer   
from .models import Search, Notification                   

class SearchView(viewsets.ModelViewSet):       
    serializer_class = SearchSerializer   

    def get_queryset(self):
        user = self.request.user
        return Search.objects.filter(user=user)

class NotificationView(viewsets.ModelViewSet):       
    serializer_class = NotificationSerializer  

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user)  
    