from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('signup/', index), 
    path('login/', index),
    path('book/', index),
    path('bookings/', index),
    path('experiment/<str>', index),
    path('activate/<str:uid>/<str:token>/', index),
]
