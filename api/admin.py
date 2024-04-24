from django.contrib import admin
from .models import User, Experiments, SlotBookings, UserAccount

# Register your models here.
admin.site.register(User)
admin.site.register(Experiments)
admin.site.register(SlotBookings)
admin.site.register(UserAccount)
