from django.db import models
from django.contrib.auth import get_user_model

class Search(models.Model):
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    site = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    minPrice = models.IntegerField()
    maxPrice = models.IntegerField()
    keyword = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    alert = models.BooleanField(default=True, blank=True)

    def __str__(self):
        return self.name

class Notification(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    sound = models.CharField(max_length=100, default='default.mp4')
    status = models.BooleanField(default=True)
    search = models.ForeignKey(Search, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.search.name
