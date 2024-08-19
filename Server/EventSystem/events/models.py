from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

    def get_by_natural_key(self, username):
        return self.get(username=username)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    last_login = models.DateTimeField(null=True, blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    objects = CustomUserManager()

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    def __str__(self):
        return self.username

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name

class Booking(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_bookings')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_bookings')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} booking for {self.event.name}'

def get_default_expiration_date():
    return timezone.now() + timedelta(days=1)

def generate_token_key():
    return get_random_string(length=40)

