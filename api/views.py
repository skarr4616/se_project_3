from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User, Experiments, SlotBookings
from .serializers import UserSerializer, AddUserSerializer, SlotBookingSerializer, SlotDateSerializer, SlotSerializer

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AddUserView(APIView):

    serializer_class = AddUserSerializer

    def post(self, request):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')   
            
            queryset = User.objects.filter(email=email)
            if queryset.exists():
                return Response({'Bad Request': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(username=username, email=email, password=password)
                user.save()
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    

class LoginUserView(APIView):
    

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')
        
        queryset = User.objects.filter(email=email, password=password)
        if queryset.exists():
            return Response(UserSerializer(queryset[0]).data, status=status.HTTP_200_OK)
        
        return Response({'Bad Request': 'Invalid credentials...'}, status=status.HTTP_400_BAD_REQUEST)
    

class BookSlotView(APIView):
    
    serializer_class = SlotBookingSerializer

    def post(self, request):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            slot_date = serializer.validated_data.get('slot_date')
            slot_time = serializer.validated_data.get('slot_time')
            
            slot = SlotBookings(email=email, slot_date=slot_date, slot_time=slot_time)
            slot.save()
            return Response(SlotSerializer(slot).data, status=status.HTTP_201_CREATED)
        
        print(serializer.errors)
        
        return Response({'Bad Request': 'Invalid...'}, status=status.HTTP_400_BAD_REQUEST)
    
class ListBookingView(APIView):
    
    serializer_class = SlotDateSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            slot_date = serializer.validated_data.get('slot_date')
            queryset = SlotBookings.objects.filter(slot_date=slot_date)
            return Response(SlotBookingSerializer(queryset, many=True).data, status=status.HTTP_200_OK)
        
        print(serializer.errors)
        
        return Response({'Bad Request': 'Invalid date...'}, status=status.HTTP_400_BAD_REQUEST)