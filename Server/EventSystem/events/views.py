from django.shortcuts import render
from .models import CustomUser, Event, Booking, CustomToken
from .serializers import UserSerializer, EventSerializer, BookingSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
from django.utils.crypto import get_random_string

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        is_admin = request.data.get('is_admin', False)
        
        
        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        # user = CustomUser.objects.create_user(username=username, email=email, is_admin=is_admin)
        # user.set_password(password)
        user = CustomUser(
            username=username,
            email=email,
            # password=make_password(password),
            password=password,
            is_admin=is_admin
        )
        user.save()
        
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        # email = request.data.get('email')
        password = request.data.get('password')
        # user = CustomUser.objects.get(username=username)
        
        # if user.check_password(password):
        #     token, created = Token.objects.get_or_create(user=user)
        #     return Response({'token': token.key, 'user_id': user.id, 'username': user.username})
        # else:
        #     return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # try:
        #     user = CustomUser.objects.get(username=username)
        # except CustomUser.DoesNotExist:
        #     return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        # if not check_password(password, user.password):
        #     return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        # user = authenticate(username=username, password=password)
        user = CustomUser.objects.get(username=username)
        
        if user is None:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        if user.password == password:
            print(user.username)
            
            # Generate or get token
            # token, created = Token.objects.get_or_create(user = user)
            # return Response({'token': token.key}, status=status.HTTP_200_OK)
            # return Response({'message': 'User loged in successfully'}, status=status.HTTP_200_OK)
            # print(user.username)
            
            token = CustomToken.objects.filter(user=user).first()
            print(token)
            
            if token and token.is_valid():
                return Response({'token': token.key, 'user_id': user.id, 'username': user.username, 'is_admin': user.is_admin})

            # If no valid token exists, create a new one
            if token is None or not token.is_valid():
                token = CustomToken.objects.create(user=user)
            
            return Response({'token': token.key, 'user_id': user.id, 'username': user.username, 'is_admin': user.is_admin})
        
        # else:
        #     return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
