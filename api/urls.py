from django.urls import path
from .views import index
from .views import ExperimentView
from django.conf.urls import url
urlpatterns = [
    path('', index),
    path('exp', ExperimentView.as_view()),
]