from django.db import models
from django.conf import settings
from datetime import date, timedelta

class TaskModel(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    duration = models.IntegerField()
    lastCompletion = models.DateField(default=date.today()-timedelta(days = 1))

