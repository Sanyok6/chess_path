from rest_framework import serializers
from .models import TaskModel


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TaskModel
        fields = ("name", "duration", "lastCompletion")
    def validate(self, data):
        return data

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TaskModel
        fields = ("name", "duration", "lastCompletion", "creator")