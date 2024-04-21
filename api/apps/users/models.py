import uuid
import django
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils.translation import gettext_lazy as _

class UserManager(django.contrib.auth.models.UserManager):
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.username = user.email
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user
    
# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField("Name", max_length=240)
    email = models.EmailField(_("email address"), unique=True, blank=True)
    password = models.CharField(_("password"), max_length=128)

    class Meta:
        ordering = ["email"]

    USERNAME_FIELD = 'email'
    PASSWORD_FIELD = 'password'
    REQUIRED_FIELDS = []

    objects = UserManager()

