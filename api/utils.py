from .models import SlotBookings, Experiments
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework import status
from .Blynk import BlynkBuilder

class ExperimentHandlerInterface:

    def is_available(self, email, experiment_code):
        """
        Check if the slot and experiment is available for booking
        """
        pass

class ExperimentSlotUtil(ExperimentHandlerInterface):

    def __init__(self):
        super().__init__()
        self.__current_time = datetime.now() + timedelta(hours=5, minutes=30)

    def is_available(self, email, experiment_code):

        print("ExperimentSlotUtil: is_available")
        
        first_check = self.__checkCurrentSlotforUser(email, experiment_code)
        if (first_check == 2):
            return Response("2", status=status.HTTP_200_OK)
        elif (first_check == 1):
            return Response("3", status=status.HTTP_200_OK)
        
        if (self.__checkCurrentSlot(experiment_code)):
            if (self.__checkNextSlot(experiment_code)):
                return Response("2", status=status.HTTP_200_OK)
            
            return Response("0", status=status.HTTP_200_OK)
        
        return Response("0", status=status.HTTP_200_OK)

    # Check if the current slot belongs to the user
    def __checkCurrentSlotforUser(self, email, experiment_code):
        
        print("ExperimentSlotUtil: __checkCurrentSlotforUser")
        bookings = SlotBookings.objects.filter(
                email = email,
                experiment_code = experiment_code, 
                slot_date = (self.__current_time.date()).strftime('%Y-%m-%d'),
                slot_time__lte = (self.__current_time.time()).strftime('%H:%M:%S')).order_by('-slot_time')
        
        if (bookings.exists() == False):
            return 0
        
        last_booking = bookings[0]
        current_time_string = (self.__current_time.time()).strftime('%H:%M:%S')
        difference = datetime.strptime(current_time_string, '%H:%M:%S') - datetime.strptime(str(last_booking.slot_time), '%H:%M:%S')
        
        # Check if the last booking is < 15 minutes from now
        if (difference.seconds < 900):
            # Check if the user has time to perform the experiment
            if (difference.seconds < 300):
                return 2
            else:
                return 1
        
        return 0
    
    # Check if the current slot is available
    def __checkCurrentSlot(self, experiment_code):

        print("ExperimentSlotUtil: __checkCurrentSlot")
        bookings = SlotBookings.objects.filter(
                experiment_code = experiment_code, 
                slot_date = (self.__current_time.date()).strftime('%Y-%m-%d'),
                slot_time__lte = (self.__current_time.time()).strftime('%H:%M:%S')).order_by('-slot_time')
        
        # If no bookings exist before the current time, then slot exists
        if (bookings.exists() == False):
            return True
        
        last_booking = bookings[0]
        current_time_string = (self.__current_time.time()).strftime('%H:%M:%S')
        difference = datetime.strptime(current_time_string, '%H:%M:%S') - datetime.strptime(str(last_booking.slot_time), '%H:%M:%S')

        # Check if the last booking is < 15 minutes from now
        if (difference.seconds < 900):
            return False
        
        return True
    
    # Check if the next slot is available
    def __checkNextSlot(self, experiment_code):
        
        print("ExperimentSlotUtil: __checkNextSlot")
        bookings = SlotBookings.objects.filter(
                experiment_code = experiment_code, 
                slot_date = (self.__current_time.date()).strftime('%Y-%m-%d'),
                slot_time__gt = (self.__current_time.time()).strftime('%H:%M:%S')).order_by('slot_time')

        if (bookings.exists() == False):
            return True
        
        next_booking = bookings[0]
        current_time_string = (self.__current_time.time()).strftime('%H:%M:%S')
        difference = datetime.strptime(str(next_booking.slot_time), '%H:%M:%S') - datetime.strptime(current_time_string, '%H:%M:%S')

        print(difference.seconds)

        # Check if the next booking is > 15 minutes from now
        if (difference.seconds > 900):
            return True
        
        return False

class ExperimentAvailableUtil(ExperimentHandlerInterface):

    def __init__(self):
        super().__init__()
        self.__nextUtil = ExperimentSlotUtil()
    
    def is_available(self, email, experiment_code):
        
        print("ExperimentAvailableUtil: is_available")
        queryset = Experiments.objects.filter(experiment_code = experiment_code)

        Status = queryset[0].experiment_status        
        if (Status == True):
            return Response("1", status=status.HTTP_200_OK)
        
        return self.__nextUtil.is_available(email, experiment_code)

class ExperimentOnlineUtil(ExperimentHandlerInterface):

    def __init__(self):
        super().__init__()
        self.__nextUtil = ExperimentAvailableUtil()
        self.__blynk = BlynkBuilder()
    
    def is_available(self, email, experiment_code):
        
        print("ExperimentOnlineUtil: is_available")
        queryset = Experiments.objects.filter(experiment_code = experiment_code)

        key = queryset[0].experiment_key
        response = self.__blynk.hardwareStatus(key)

        if (response.status_code == 200):
            if (not response.json()):
                return self.__nextUtil.is_available(email, experiment_code)
        
        return Response("0", status=status.HTTP_200_OK)
        

class ExperimentExistsUtil(ExperimentHandlerInterface):

    def __init__(self):
        super().__init__()
        self.__nextUtil = ExperimentOnlineUtil()
    
    def is_available(self, email, experiment_code):
        
        print("ExperimentExistsUtil: is_available")
        queryset = Experiments.objects.filter(experiment_code = experiment_code)
        
        if (queryset.exists() == False):
            return Response({'Bad Request': 'Invalid experiment code...'}, status=status.HTTP_400_BAD_REQUEST)
        
        return self.__nextUtil.is_available(email, experiment_code)

class ExperimentHandler:

    def __init__(self, email, experiment_code):
        self.__experiment_code = experiment_code
        self.__email = email
        self.__util = ExperimentExistsUtil()
    
    def isExperimentPossible(self):
        
        print("ExperimentHandler: isExperimentPossible")
        return self.__util.is_available(self.__email, self.__experiment_code)
