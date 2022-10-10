from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from puzzles.models import SetModel


class CustomUser(AbstractUser):
    username = models.CharField("username", max_length=25)
    email = models.EmailField("email address", unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("username",)

class UserData(models.Model):
    id = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE)
    last_completion = models.DateField(null=True, blank=True)
    record = models.PositiveIntegerField(default=0)
    current_streak = models.PositiveIntegerField(default=0)
    sets_practiced = models.ManyToManyField(SetModel)
