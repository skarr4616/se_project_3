from django.shortcuts import render # type: ignore

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')