from django.contrib import admin
from .models import Experiments, SlotBookings, UserAccount

# Register your models here.
admin.site.register(Experiments)
admin.site.register(SlotBookings)
admin.site.register(UserAccount)
