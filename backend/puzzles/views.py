from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .serializers import SetCreateSerializer, SetSerializerWithPuzzles, PuzzleSerializer 
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
        SetModel.objects.filter(pk=pk).update(last_opened=date.today())
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