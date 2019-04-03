from web import scrape
from celery import task
from .models import Search
from result.models import Result
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from .serializers import SearchSerializer

@task()
def periodic_search_task():
    for search in Search.objects.all():
        res = Result.objects.filter(search=search.id)
        serializer = SearchSerializer(search)
        scrape.findV2(serializer.data, res)

@task(name="search_task")
def search_task(instance):
    scrape.find(instance)



