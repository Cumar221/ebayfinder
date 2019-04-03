from rest_framework import serializers
from . import models


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = '__all__'

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Search
        fields = '__all__'

    def create(self, validated_data):
        print('---->', validated_data)
        search = models.Search.objects.create(**validated_data)
        models.Notification.objects.create(id=search.pk, search=search, user=search.user)
        return search

