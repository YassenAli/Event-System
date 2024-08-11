from rest_framework.authentication import get_authorization_header
import jwt
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from events.models import CustomUser

def jwt_authentication(get_response):
    def middleware(request):
        auth = get_authorization_header(request).split()
        if len(auth) == 2 and auth[0].lower() == b'bearer':
            token = auth[1]
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user = CustomUser.objects.get(id=payload['user_id'])
            except jwt.ExpiredSignatureError:
                return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.DecodeError:
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return get_response(request)

    return middleware
