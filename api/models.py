from django.db import models
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