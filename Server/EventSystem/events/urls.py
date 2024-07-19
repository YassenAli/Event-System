from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, EventViewSet, BookingViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('events', EventViewSet)
router.register('events', BookingViewSet)

url_patterns = [
    path('', include(router.urls))
]