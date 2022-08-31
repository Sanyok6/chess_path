from rest_framework import views, viewsets
from rest_framework import permissions
from authentication.serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from django.conf import settings

from django.contrib.auth import authenticate, login, logout


User = get_user_model()

from . import serializers

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class SignupView(views.APIView):
    """View to create a new user."""

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """Handle the signup request."""
        serializer = serializers.UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.set_cookie('isLoggedIn', 'yes', max_age=settings.SESSION_COOKIE_AGE, samesite='Lax')
        return response

class LoginView(views.APIView):
    """View to authenticate user and log them in."""

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """Handle the login request."""
        print(request.data)
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

