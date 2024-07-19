from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    
class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    description = models.TextField()
    attendees = models.ManyToManyField(User, related_name='attendees')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_by')
    
    def __str__(self):
        return self.name
    
class Booking(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='events_bookings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_bookings')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} booking for {self.event.name}'