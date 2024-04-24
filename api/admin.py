from django.contrib import admin
from .models import User, Experiments, SlotBookings
# Register your models here.

admin.site.register(Experiments)
admin.site.register(User)
admin.site.register(SlotBookings)
