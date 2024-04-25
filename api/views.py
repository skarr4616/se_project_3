from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

import logging
from datetime import datetime, timedelta
from .Blynk import BlynkBuilder
from .models import Experiments, SlotBookings
from .serializers import (
                SlotBookingSerializer, 
                SlotDateSerializer, 
                SlotSerializer, 
                ExperimentSerializer,
)

from .utils import ExperimentHandler

logging.basicConfig(filename='logs.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# view to book a slot
class BookSlotView(APIView):
    
    serializer_class = SlotBookingSerializer

    def post(self, request):
        
        logging.info("BookSlotView: Email: " + str(request.user) + " - Booking a slot...")

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            experiment_code = serializer.validated_data.get('experiment_code')
            slot_date = serializer.validated_data.get('slot_date')
            slot_time = serializer.validated_data.get('slot_time')
            
            slot = SlotBookings(email=email, slot_date=slot_date, slot_time=slot_time, experiment_code=experiment_code)
            slot.save()

            logging.info("BookSlotView: Email: " + str(request.user) + " - Slot booked successfully...")
            return Response(SlotSerializer(slot).data, status=status.HTTP_201_CREATED)
        
        print(serializer.errors)
        logging.error("BookSlotView: Email: " + str(request.user) + " - Invalid data...")   
        return Response({'Bad Request': 'Invalid...'}, status=status.HTTP_400_BAD_REQUEST)


# view to list all bookings of a particular date and experiment    
class ListBookingView(APIView):
    
    serializer_class = SlotDateSerializer

    def post(self, request):
        
        logging.info("ListBookingView: Email: " + str(request.user) + " - Listing bookings...")

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            slot_date = serializer.validated_data.get('slot_date')
            experiment_code = serializer.validated_data.get('experiment_code')
            queryset = SlotBookings.objects.filter(slot_date=slot_date, experiment_code=experiment_code)

            logging.info("ListBookingView: Email: " + str(request.user) + " - Bookings listed successfully...")
            return Response(SlotBookingSerializer(queryset, many=True).data, status=status.HTTP_200_OK)
        
        print(serializer.errors)
        logging.error("ListBookingView: Email: " + str(request.user) + " - Invalid data...")
        return Response({'Bad Request': 'Invalid date...'}, status=status.HTTP_400_BAD_REQUEST)
    


# view to list all bookings of a particular user
class ListUserBookingsView(APIView):

    def get(self, request):
        
        logging.info("ListUserBookingsView: Email: " + str(request.user) + " - Listing user bookings...")

        email = request.user
        queryset = SlotBookings.objects.filter(email=email)
        
        data = []
        for booking in queryset:
            slot_date = booking.slot_date
            slot_time = booking.slot_time
            experiment_name = booking.experiment_code.experiment_name

            data.append({
                'slot_date': slot_date,
                'slot_time': slot_time,
                'experiment_name': experiment_name,
            })

        logging.info("ListUserBookingsView: Email: " + str(request.user) + " - User bookings listed successfully...")
        return Response(data, status=status.HTTP_200_OK)
    


# view to list all experiments and their details
class ExperimentView(APIView):
        
        blynk = BlynkBuilder()
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
        def get(self, request):
            
            action = request.query_params.get('action')

            if (action == 'list'):
                queryset = Experiments.objects.all()
                logging.info("ExperimentView: Email: " + str(request.user) + " - Action: " + str(action) + "...")
                logging.info("ExperimentView: Email: " + str(request.user) + " - Experiments listed successfully...")
                return Response(ExperimentSerializer(queryset, many=True).data, status=status.HTTP_200_OK)
            elif (action == 'status'):

                email = request.user
                exp_code = request.GET.get('exp_code')

                logging.info("ExperimentView: Email: " + str(request.user) + " - Action: " + str(action) + " - Experiment Code: " + str(exp_code) + "...")

                handler = ExperimentHandler(email, exp_code)
                return handler.isExperimentPossible()
            
            logging.error("ExperimentView: Email: " + str(request.user) + " - Invalid action...")
            return Response({'Bad Request': 'Invalid action...'}, status=status.HTTP_400_BAD_REQUEST)

        
        def put(self,request):
            

            exp_code = request.data.get('exp_id')
            action = request.data.get('action')
            value = request.data.get('value')
            method = request.data.get('method')

            logging.info("ExperimentView: Email: " + str(request.user) + " - Action: " + str(action) + " - Experiment Code: " + str(exp_code) + " - Value: " + str(value) + "Method: " + str(method) + "...")

            queryset = Experiments.objects.filter(experiment_code=exp_code)
            
            if(queryset.exists() == False):
                logging.error("ExperimentView: Email: " + str(request.user) + " - Incorrect Experiment ID...")
                return Response("Incorrect Experiment ID", status=status.HTTP_400_BAD_REQUEST)

            if(method == "status"):
                print("Updating status")
                if(value == "enter"):
                    print("Entering")
                    queryset.update(experiment_status=True)
                else:
                    print("Exiting")
                    queryset.update(experiment_status=False)

                logging.info("ExperimentView: Email: " + str(request.user) + " - Status updated successfully...")
                return Response("Success", status=status.HTTP_200_OK)
            
            if(method == "blynk"):
                key = queryset[0].experiment_key
                header = "token="+key+"&"+action+"="+value
                status_code = self.blynk.update_data(key, action, value)
                if (status_code != 200):
                    logging.error("ExperimentView: Email: " + str(request.user) + " - Failed to update the device...")
                    return Response("Failed to update the device", status=status.HTTP_400_BAD_REQUEST)
                else:
                    logging.info("ExperimentView: Email: " + str(request.user) + " - Device updated successfully...")
                    return Response("Success", status=status.HTTP_200_OK)