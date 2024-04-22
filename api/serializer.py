from rest_framework import serializers
from .models import Experiments

class ExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiments
        fields = ['exp_id','exp_name','exp_status','exp_que','exp_key']
        