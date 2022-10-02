from django.db import models
from django.conf import settings
from datetime import date
from django.utils.crypto import get_random_string

def generate_random_id():
    return get_random_string(6)

class SetModel(models.Model):
    id = models.SlugField(allow_unicode=True, primary_key=True, default=generate_random_id)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    last_opened = models.DateField(default=date.today)

class PuzzleModel(models.Model):
    in_set = models.ForeignKey(SetModel, on_delete=models.CASCADE)
    fen = models.CharField(max_length=50)
    correct_variations = models.CharField(max_length=500)
