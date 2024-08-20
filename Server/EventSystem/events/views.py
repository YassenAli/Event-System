from django.shortcuts import render
from .models import CustomUser, Event, Booking
from .serializers import UserSerializer, EventSerializer, BookingSerializer
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
from django.utils.crypto import get_random_string
import jwt
from datetime import datetime, timedelta
from rest_framework.decorators import action
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenVerifyResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def destroy(self, request, pk=None):
        try:
            user = CustomUser.objects.get(id=pk)
            user.delete()
            return Response({"message": "User deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def destroy(self, request, pk=None):
        try:
            event = Event.objects.get(id=pk)
            event.delete()
            return Response({"message": "Event deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request):
        data = request.data
        data['created_by'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        try:
            event = Event.objects.get(id=pk)
            serializer = self.get_serializer(event, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
        

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    @action(detail=False, methods=['post'], url_path='book-event')
    def book_event(self, request):
        user_email = request.data.get('email')
        event_id = request.data.get('eventId')

        try:
            user = CustomUser.objects.get(email=user_email)
            event = Event.objects.get(id=event_id)

            # Check if booking already exists
            if Booking.objects.filter(user=user, event=event).exists():
                return Response({"error": "You have already booked this event."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new booking
            Booking.objects.create(user=user, event=event)
            return Response({"message": "Event booked successfully!"}, status=status.HTTP_201_CREATED)

        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['delete'], url_path='cancel-booking')
    def cancel_booking(self, request):
        user_email = request.query_params.get('email')
        event_id = request.query_params.get('eventId')

        try:
            user = CustomUser.objects.get(email=user_email)
            event = Event.objects.get(id=event_id)
            booking = Booking.objects.get(user=user, event=event)
            booking.delete()
            return Response({"message": "Booking canceled successfully!"}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)

class SignupView(APIView):
    admin_emails = [
        'admin1@gmail.com',
        'admin2@gmail.com',
    ]
    
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        is_superuser = request.data.get('is_superuser', False)
        
        if email in self.admin_emails:
            is_superuser = True
        
        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUser(
            username=username,
            email=email,
            is_superuser=is_superuser
        )
        user.set_password(password)
        user.save()
        
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    
    def delete(self, request, user_id):
        user = CustomUser.objects.filter(id=user_id).first()
        if user is None:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
    

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        if check_password(password, user.password):
            
            # Create JWT token
            payload = {
                'user_id': user.id,
                'username': user.username,
                'is_superuser': user.is_superuser,
                'exp': datetime.utcnow() + timedelta(hours=24),  # Token expiration time
                'iat': datetime.utcnow(),  # Issued at time
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            return Response({'token': token, 'user_id': user.id, 'username': user.username, 'is_superuser': user.is_superuser})
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
