from django.urls import path, include
from .views import AddUserView, LoginUserView, BookSlotView, ListBookingView, ExperimentView, ListUserBookingsView

urlpatterns = [
    path('signup', AddUserView.as_view()),
    path('login', LoginUserView.as_view()),
    path('book', BookSlotView.as_view()),
    path('list', ListBookingView.as_view()),
    path('exp', ExperimentView.as_view()),
    path('user', ListUserBookingsView.as_view()),
    
]