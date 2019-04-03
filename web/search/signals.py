from django.dispatch import receiver
from django.db.models.signals import post_save,post_delete
from .models import Search
from .tasks import search_task
from .serializers import SearchSerializer

@receiver([post_save, post_delete], sender=Search)
def send_task(sender, instance, *args, **kwargs):
    if kwargs.get("created"):
        print("******** innnnnn Signal", dir(instance))
        serializer = SearchSerializer(instance)
        search = SearchSerializer(sender)
        print(search)
        search_task.delay(serializer.data)

