from django.db import models

# Create your models here.

class Experiments(models.Model):
    exp_id = models.CharField(max_length=100,null=False,unique=True)
    exp_name = models.CharField(max_length=100,null=False)
    exp_status = models.BooleanField(null=False)
    exp_que = models.IntegerField(null=False)
    exp_key = models.CharField(max_length=100,null=False)

