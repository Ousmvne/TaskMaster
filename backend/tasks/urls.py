from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserProfileViewSet, signup

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
]
