from django.contrib import admin
from .models import Event, Booking, CustomUser

admin.site.register(CustomUser)
admin.site.register(Event)
admin.site.register(Booking)
