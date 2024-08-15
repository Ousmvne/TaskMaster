from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    DIFFICULTY_CHOICES = [
        ('E', 'Facile'),
        ('M', 'Moyen'),
        ('H', 'Difficile'),
    ]

    CATEGORY_CHOICES = [
        ('Work', 'Travail'),
        ('Personal', 'Personnel'),
        ('Leisure', 'Loisirs'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_CHOICES)
    estimated_duration = models.DurationField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    experience_points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)

    def gain_experience(self, points):
        self.experience_points += points
        if self.experience_points >= self.get_experience_needed():
            self.level_up()

    def level_up(self):
        self.level += 1
        self.experience_points = 0

    def get_experience_needed(self):
        return self.level * 100  # Par exemple, 100 points par niveau
