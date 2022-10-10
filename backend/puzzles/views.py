from urllib import response
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from authentication.models import UserData
from .serializers import SetCreateSerializer, SetSerializer, SetSerializerWithPuzzles, PuzzleSerializer 
from .models import PuzzleModel, SetModel
from datetime import date


class SetsViewSet(viewsets.ModelViewSet):
    queryset = SetModel.objects.all()

    def get_serializer_class(self):
        if self.action.lower() in ("create", "update", "partial_update", "delete"):
            return SetCreateSerializer
        else:
            return SetSerializerWithPuzzles

    def retrieve(self, request, pk=None):
        queryset = SetModel.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = SetSerializerWithPuzzles(user)
        current_set = SetModel.objects.get(pk=pk)
        if request.user == current_set.creator:
            current_set.last_opened = date.today()
        else:
            UserData.objects.get(pk=request.user).sets_practiced.add(current_set)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(creator=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(SetSerializerWithPuzzles(instance, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED, headers=headers)


class PuzzlesViewSet(viewsets.ModelViewSet):
    queryset = PuzzleModel.objects.all()
    serializer_class = PuzzleSerializer