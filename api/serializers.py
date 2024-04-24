from rest_framework import serializers
from .models import User, Experiments, SlotBookings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlotBookings
        fields = ('id', 'email', 'slot_date', 'slot_time')

class ExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiments
        fields = ('id', 'experiment_code', 'experiment_name', 'experiment_status', 'experiment_key', 'experiment_description')

class AddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class SlotBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlotBookings
        fields = ('email', 'experiment_code', 'slot_date', 'slot_time')

class SlotDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlotBookings
        fields = ('slot_date', 'experiment_code' )

class AddExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiments
        fields = ('experiment_name', 'experiment_key', 'experiment_description')