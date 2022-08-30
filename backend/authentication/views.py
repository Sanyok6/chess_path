from django.contrib.auth.models import User, Group
from rest_framework import views, viewsets
from rest_framework import permissions
from authentication.serializers import UserSerializer

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

