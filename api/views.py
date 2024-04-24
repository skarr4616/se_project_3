from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .Blynk import Blynk
from .models import User, Experiments, SlotBookings
from .serializers import (
                UserSerializer, 
                AddUserSerializer, 
                SlotBookingSerializer, 
                SlotDateSerializer, 
                SlotSerializer, 
                ExperimentSerializer,
                UserCreateSerializer
)

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
            experiment_code = serializer.validated_data.get('experiment_code')
            slot_date = serializer.validated_data.get('slot_date')
            slot_time = serializer.validated_data.get('slot_time')
            
            slot = SlotBookings(email=email, slot_date=slot_date, slot_time=slot_time, experiment_code=experiment_code)
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
            experiment_code = serializer.validated_data.get('experiment_code')
            queryset = SlotBookings.objects.filter(slot_date=slot_date, experiment_code=experiment_code)
            return Response(SlotBookingSerializer(queryset, many=True).data, status=status.HTTP_200_OK)
        
        print(serializer.errors)
        
        return Response({'Bad Request': 'Invalid date...'}, status=status.HTTP_400_BAD_REQUEST)
    

class ListUserBookingsView(APIView):

    def get(self, request):
        
        email = request.query_params.get('email')
        queryset = SlotBookings.objects.filter(email=email)
        return Response(SlotBookingSerializer(queryset, many=True).data, status=status.HTTP_200_OK)
    

class ExperimentView(APIView):
        
        blynk = Blynk()
    
        def get(self, request):
            
            print("Hereee")

            action = request.query_params.get('action')

            if (action == 'list'):
                queryset = Experiments.objects.all()
                return Response(ExperimentSerializer(queryset, many=True).data, status=status.HTTP_200_OK)
            elif (action == 'status'):
                exp_code = request.GET.get('exp_code')
                queryset = Experiments.objects.filter(experiment_code=exp_code)

                if(queryset.exists() == False):
                    return Response("Incorrect Experiment ID", status=status.HTTP_400_BAD_REQUEST)
                else:
                    key = queryset[0].experiment_key
                    response = self.blynk.hardwareStatus(key)
                    if(response.status_code == 200):
                        if(not response.json()):
                            return Response("1", status=status.HTTP_200_OK) 

                    return Response("0", status=status.HTTP_200_OK) 
        
        def put(self,request):
            
            exp_code = request.data.get('exp_id')
            action = request.data.get('action')
            value = request.data.get('value')

            queryset = Experiments.objects.filter(experiment_code=exp_code)
            if(queryset.exists() == False):
                return Response("Incorrect Experiment ID", status=status.HTTP_400_BAD_REQUEST)
            else:
                key = queryset[0].experiment_key
                header = "token="+key+"&"+action+"="+value
                status_code = self.blynk.update_data(key, action, value)
                if (status_code != 200):
                    return Response("Failed to update the device", status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response("Success", status=status.HTTP_200_OK)