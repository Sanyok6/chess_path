from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('sets', views.SetsViewSet, basename='sets')
router.register('puzzles', views.PuzzlesViewSet, basename='puzzles')

urlpatterns = router.urls


