from datetime import date, timedelta
from django.db.models import Q
from rest_framework import pagination, status, permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import TaskModel
from authentication.models import UserData
from .serializers import (TaskSerializer,
                          TaskCreateSerializer)


class TasksPaginator(pagination.PageNumberPagination):
    page_size = 30


class TasksViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = TasksPaginator

    def get_queryset(self):
        user = self.request.user
        return (TaskModel.objects.all())

    def get_serializer_class(self):
        if self.action.lower() in ("create", "update", "partial_update", "delete"):
            return TaskCreateSerializer

        else:
            return TaskSerializer

    def create(self, request, *args, **kwargs):
        request.data["duration"]*=60
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(creator=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(TaskCreateSerializer(instance, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(TaskCreateSerializer(updated_instance,
                                             context=self.get_serializer_context()).data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data={"lastCompletion": date.today()}, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save()

        queryset = UserData.objects.get(pk=request.user)

        queryset.total_completed += 1
        
        if TaskModel.objects.filter(creator=request.user).exclude(lastCompletion=date.today()).__len__() == 0:
            if queryset.last_completion == (date.today()-timedelta(days=1)):
                queryset.current_streak=queryset.current_streak+1
            else: 
                queryset.current_streak=1
            queryset.last_completion=date.today()

        queryset.save()

        return Response(TaskCreateSerializer(updated_instance,
                                             context=self.get_serializer_context()).data)