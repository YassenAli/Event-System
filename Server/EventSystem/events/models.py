from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta
from django.utils import timezone

class CustomUser(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    seatNumber = models.IntegerField(default=0)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    is_anonymous = False
    is_authenticated = True

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    # def set_password(self, raw_password):
    #     self.password = make_password(raw_password)

    # def check_password(self, raw_password):
    #     return check_password(raw_password, self.password)
    
    def __str__(self):
        return self.username

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    description = models.TextField()
    attendees = models.ManyToManyField(CustomUser, related_name='events_attending')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='events_created')
    
    def __str__(self):
        return self.name

class Booking(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} booking for {self.event.name}'

def get_default_expiration_date():
    return timezone.now() + timedelta(days=1)

def generate_token_key():
    return get_random_string(length=40)

class CustomToken(models.Model):
    key = models.CharField(max_length=40, unique=True, default=generate_token_key)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=get_default_expiration_date)

    def is_valid(self):
        now = timezone.now()
        return self.expires_at > now
