from rest_framework import serializers
from .models import TaskModel

Task = TaskModel()

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Task
        fields = '__all__'
    def validate(self, data):
        return data

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Task
        fields = '__all__'