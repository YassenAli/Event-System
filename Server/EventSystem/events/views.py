from django.shortcuts import render
<<<<<<< HEAD

# Create your views here.
=======
from .models import User, Event, Booking
from .serializers import UserSerializer, EventSerializer, BookingSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
>>>>>>> Server-Side
