from rest_framework import views, viewsets
from rest_framework import permissions
from authentication.serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from django.conf import settings
from django.http import Http404
from . import models
from rest_framework.decorators import action

from django.contrib.auth import authenticate, login, logout


User = get_user_model()

from . import serializers

def get_full_data(user, request):
    return {
        "user": serializers.UserSerializer(user, context=dict(request=request)).data,
    }

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ("get", "put", "patch", "options")
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    queryset = models.CustomUser.objects.all()

    @action(methods=("GET",), detail=False, url_path="me")
    def get_current_user_data(self, request):
        return Response(get_full_data(request.user, request))

    def list(self, request):
        raise Http404()

class SignupView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = serializers.UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.set_cookie('isLoggedIn', 'yes', max_age=settings.SESSION_COOKIE_AGE, samesite='Lax')
        return response

class LoginView(views.APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        login_serializer = serializers.LoginSerializer(data=request.data)
        login_serializer.is_valid(raise_exception=True)

        user = authenticate(request, **login_serializer.data)

        if user is None:
            return Response({'detail': 'Account with the given credentials does not exist'},
                            status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        if not user.is_active:
            return Response({'detail': 'User is not active'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.set_cookie('isLoggedIn', 'yes', max_age=settings.SESSION_COOKIE_AGE, samesite='Lax')

        return response

class LogoutView(views.APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('isLoggedIn')
        return response

