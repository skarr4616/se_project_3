from django.urls import path
from .views import AddUserView, LoginUserView, BookSlotView, ListBookingView

urlpatterns = [
    path('signup', AddUserView.as_view()),
    path('login', LoginUserView.as_view()),
    path('book', BookSlotView.as_view()),
    path('list', ListBookingView.as_view()),
]