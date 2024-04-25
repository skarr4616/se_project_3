from django.urls import path, include
from .views import BookSlotView, ListBookingView, ExperimentView, ListUserBookingsView

urlpatterns = [
    path('book', BookSlotView.as_view()),
    path('list', ListBookingView.as_view()),
    path('exp', ExperimentView.as_view()),
    path('user', ListUserBookingsView.as_view()),
    
]