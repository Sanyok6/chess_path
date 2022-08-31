# from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserData

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
    
    def create(self, data):
        return User.objects.create_user(username=data["username"], email=data["email"], password=data['password'])
        # print(data.id)
        # d = UserData(id=data)
        # d.save()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'is_staff', 'data')

    def get_data(self, user):
        if not UserData.objects.filter(id=user): 
            d = UserData(id=user)
            d.save()
            queryset = UserData.objects.get(pk=user)
        else: 
            queryset = UserData.objects.get(pk=user)
        

        print(queryset.last_completion)

        return {
            "record": queryset.record,
            "last_completion": queryset.last_completion
        }

class LoginSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField()


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     password = None
#     record = 0

#     class Meta:
#         model = User
#         fields = ['url', 'username', 'email', 'record', 'groups']
