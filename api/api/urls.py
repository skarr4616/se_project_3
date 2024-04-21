from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from apps.users.views import AuthTokenObtainViewset, AuthTokenRefreshViewset
# from apps.users.views import UserViewSet

router = routers.DefaultRouter(trailing_slash=True)

# router.register(r"users", UserViewSet)
router.register(r"auth/obtain_token", AuthTokenObtainViewset, 'obtain_token')
router.register(r"auth/refresh_token", AuthTokenRefreshViewset, 'refresh_token')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
