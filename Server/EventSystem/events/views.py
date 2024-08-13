from django.shortcuts import render
from .models import CustomUser, Event, Booking, CustomToken
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
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data
        data['created_by'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        data = request.data
        data['created_by'] = request.user.id
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.created_by != request.user:
            return Response({'error': 'You are not authorized to delete this event'}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class SignupView(APIView):
    admin_emails = [
        'admin1@gmail.com',
        'admin2@gmail.com',
    ]
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        is_admin = request.data.get('is_admin', False)
        
        if email in self.admin_emails:
            is_admin = True
        
        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUser(
            username=username,
            email=email,
            is_admin=is_admin
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
                'is_admin': user.is_admin,
                'exp': datetime.utcnow() + timedelta(hours=24),  # Token expiration time
                'iat': datetime.utcnow(),  # Issued at time
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            return Response({'token': token, 'user_id': user.id, 'username': user.username, 'is_admin': user.is_admin})
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
            
            
            
            # token = CustomToken.objects.filter(user=user).first()
            # if token and token.is_valid():
            #     return Response({'token': token.key, 'user_id': user.id, 'username': user.username, 'is_admin': user.is_admin})
            # # If no valid token exists, create a new one
            # if token is None or not token.is_valid():
            #     token = CustomToken.objects.create(user=user)
            
            # return Response({'token': token.key, 'user_id': user.id, 'username': user.username, 'is_admin': user.is_admin})