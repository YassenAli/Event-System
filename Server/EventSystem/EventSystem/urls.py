from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import UserViewSet, EventViewSet, BookingViewSet, SignupView, LoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'events', EventViewSet, basename='event')
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    # path('api/signup/<int:user_id>/', SignupView.as_view(), name='delete'),
]