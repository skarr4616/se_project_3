from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import validate_email
import string
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Experiments.objects.filter(experiment_code = code).count() == 0:
            break

    return code


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Experiments(models.Model):
    experiment_code = models.CharField(max_length=8, unique=True, default=generate_unique_code)
    experiment_name = models.CharField(max_length=100, null=False)
    experiment_status = models.BooleanField(default=False, null=False)
    experiment_key = models.CharField(max_length=100, null=False)
    experiment_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class SlotBookings(models.Model):
    email = models.ForeignKey(User, on_delete=models.CASCADE, to_field='email')
    experiment_code = models.ForeignKey(Experiments, on_delete=models.CASCADE, to_field='experiment_code')
    slot_date = models.DateField()
    slot_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

class UserAccountManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError(_('Invalid email address'))

    def create_user(self, first_name, last_name, email, password, **extra_fields):
        if not first_name:
            raise ValueError('Users must submit a first name')
        if not last_name:
            raise ValueError('Users must submit a last name')
        
        if not email:
            raise ValueError('Users must submit an email address')
        email = self.normalize_email(email)
        self.email_validator(email)

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            **extra_fields
        )
        user.set_password(password)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        user.save()
        return user
    
    def create_superuser(self, first_name, last_name, email, password, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superusers must have is_superuser=True"))
        
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superusers must have is_staff=True"))
        
        if not password:
            raise ValueError(_("Superusers must have a password"))

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Admin User: and email address is required"))
        

        user = self.create_user(first_name, last_name, email, password, **extra_fields)

        user.save()   

        return user
    
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email address"), max_length=255, unique=True)
    first_name = models.CharField(_("First Name"), max_length=255, null=True)
    last_name = models.CharField(_("Last Name"), max_length=255, null=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"   
    
    def get_short_name(self):
        return self.first_name