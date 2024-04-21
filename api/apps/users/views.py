from django.shortcuts import render


from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.models import User
# from users.models import User

# from .serializer import UserSerializer

# Create your views here.
# create a view set here for authentication

class AuthTokenObtainViewset(jwt_views.TokenObtainPairView, viewsets.ViewSet):
    """
    A simple ViewSet for user authentication using email and password.
    """

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email, password)
        try:
            user = User.objects.get(email=email)
            user = authenticate(username=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    }
                )
        except Exception as e:
            user = User.objects.create_user(email=email, password=password, username=email)
            user = authenticate(username=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    }
                )
        return Response(
            {"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
    
class AuthTokenRefreshViewset(jwt_views.TokenRefreshView, viewsets.ViewSet):
    """
    Allows to user to get refresh token using the access token.
    """

    def create(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
        
# class UserViewSet(viewsets.ModelViewSet):
#     """
#     A simple ViewSet for user authentication using email and password.
#     """

#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     @action(
#         detail=False,
#         methods=["post"],
#     )
#     def token(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")
#         print(email, password)
#         user = authenticate(username=email, password=password)
#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response(
#                 {
#                     "refresh": str(refresh),
#                     "access": str(refresh.access_token),
#                 }
#             )
#         return Response(
#             {"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
#         )
