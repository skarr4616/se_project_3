from django.urls import path
from .views import index

print("Reached here brother")
urlpatterns = [
    path('', index),
]
