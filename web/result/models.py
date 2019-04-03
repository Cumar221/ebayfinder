from django.db import models
from search.models import Search
from django.contrib.auth import get_user_model


class Result(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    price = models.CharField(max_length=300)
    seller = models.CharField(max_length=300)
    url = models.CharField(max_length=300)
    img = models.CharField(max_length=300, default='null')
    created_at = models.DateTimeField(auto_now_add=True,)
    search = models.ForeignKey(Search, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title