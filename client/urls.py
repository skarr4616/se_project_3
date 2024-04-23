from django.urls import path
from .views import index

print("Reached here")
urlpatterns = [
    path('', index),
    path('signup/', index),
    path('signin/', index),
]
