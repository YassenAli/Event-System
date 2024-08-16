from rest_framework.authentication import get_authorization_header
import jwt
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from events.models import CustomUser
from django.http import JsonResponse

def jwt_authentication(get_response):
    def middleware(request):
        auth = get_authorization_header(request).split()
        print(auth)
        if len(auth) == 2 and auth[0].lower() == b'bearer':
            token = auth[1]
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user = CustomUser.objects.get(id=payload['user_id'])
            except jwt.ExpiredSignatureError:
                # res =  Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
                # return  Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
                return JsonResponse({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
                # res.render()
                # response.content = {'error': 'Invalid token'}
                # response.status_code = status.HTTP_401_UNAUTHORIZED

            except jwt.DecodeError:
                # response.content = {'error': 'Invalid token'}
                # response.status_code = status.HTTP_401_UNAUTHORIZED
                return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
                # return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
            except CustomUser.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return JsonResponse({'error': 'Authorization header missing or malformed'}, status=status.HTTP_401_UNAUTHORIZED)
            # return Response({'error': 'Authorization header missing or malformed'}, status=status.HTTP_401_UNAUTHORIZED)

        response = get_response(request)
        return response

    return middleware
