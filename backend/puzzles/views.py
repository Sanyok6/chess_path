from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import SetCreateSerializer, SetSerializer
from .models import SetModel


class SetsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = SetModel.objects.all()

    def get_serializer_class(self):
        if self.action.lower() in ("create", "update", "partial_update", "delete"):
            return SetCreateSerializer
        else:
            return SetSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(creator=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(SetSerializer(instance, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED, headers=headers)