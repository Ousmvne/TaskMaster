from rest_framework import viewsets
from .models import Task, UserProfile
from .serializers import TaskSerializer, UserProfileSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save(user=self.request.user)
        profile = self.request.user.userprofile
        if task.completed:
            profile.gain_experience(50)  # Exemple: 50 points par tâche

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
