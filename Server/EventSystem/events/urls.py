# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import UserViewSet, EventViewSet, BookingViewSet, SignupView, LoginView

# router = DefaultRouter()
# router.register(r'users', UserViewSet)
# router.register(r'events', EventViewSet)
# router.register(r'bookings', BookingViewSet)

# urlpatterns = [
#     path('api', include(router.urls)),
#     path('api/signup/', SignupView.as_view(), name='signup'),
#     path('api/login/', LoginView.as_view(), name='login'),
# ]