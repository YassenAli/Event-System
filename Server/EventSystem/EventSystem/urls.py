from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import UserViewSet, EventViewSet, BookingViewSet, SignupView, LoginView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'events', EventViewSet)
router.register(r'events/<int:event_id>', EventViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/signup/<int:user_id>/', SignupView.as_view(), name='delete_user'),
    path('api/login/', LoginView.as_view(), name='login'),
]
