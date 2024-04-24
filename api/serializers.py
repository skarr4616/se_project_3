from rest_framework import serializers
from .models import User, Experiments, SlotBookings
from djoser.serializers import UserCreateSerializer, UserSerializer as DjoserUserSerializer
from django.contrib.auth import get_user_model

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
        fields = ('experiment_code', 'experiment_name','experiment_description')

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

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = get_user_model()
        fields = ["id", "email", "first_name", "last_name", "password"]
