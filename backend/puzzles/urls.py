from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('', views.SetsViewSet, basename='sets')

urlpatterns = router.urls
