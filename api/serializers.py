from rest_framework import serializers
from .models import User, SlotBookings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlotBookings
        fields = ('id', 'email', 'slot_date', 'slot_time')

class AddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class SlotBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlotBookings
        fields = ('email', 'slot_date', 'slot_time')

class SlotDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlotBookings
        fields = ('slot_date', )