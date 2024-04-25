from .models import SlotBookings, Experiments
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework import status
from .Blynk import BlynkBuilder
import logging

logging.basicConfig(filename='logs.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

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

        logging.info("ExperimentSlotUtil - is_available: Email: " + str(email) + " - Checking slot availability...")
        
        first_check = self.__checkCurrentSlotforUser(email, experiment_code)
        if (first_check == 2):
            logging.info("ExperimentSlotUtil - is_available: Email: " + str(email) + " - User can perform the experiment...")
            return Response("2", status=status.HTTP_200_OK)
        elif (first_check == 1):
            logging.info("ExperimentSlotUtil - is_available: Email: " + str(email) + " - User does not has time to perform the experiment...")
            return Response("3", status=status.HTTP_200_OK)
        
        if (self.__checkCurrentSlot(email, experiment_code)):
            if (self.__checkNextSlot(email, experiment_code)):
                logging.info("ExperimentSlotUtil - is_available: Email: " + str(email) + " - User can perform the experiment...")
                return Response("2", status=status.HTTP_200_OK)
            
            logging.info("ExperimentSlotUtil - is_available: Email: " + str(email) + " - User cannot perform the experiment...")
            return Response("0", status=status.HTTP_200_OK)
        
        logging.info("ExperimentSlotUtil - is_available: Email: " + str(email) + " - User cannot perform the experiment...")
        return Response("0", status=status.HTTP_200_OK)

    # Check if the current slot belongs to the user
    def __checkCurrentSlotforUser(self, email, experiment_code):
        
        logging.info("ExperimentSlotUtil - __checkCurrentSlotforUser: Email: " + str(email) + " - Checking if current slot belongs to user...")

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
    def __checkCurrentSlot(self, email, experiment_code):

        logging.info("ExperimentSlotUtil - __checkCurrentSlot: Email: " + str(email) + " - Checking if current slot is available...")
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
    def __checkNextSlot(self, email, experiment_code):
        
        logging.info("ExperimentSlotUtil - __checkNextSlot: Email: " + str(email) + " - Checking if next slot is available...")
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
        
        logging.info("ExperimentAvailableUtil - is_available: Email: " + str(email) + " - Checking if experiment is available...")
        queryset = Experiments.objects.filter(experiment_code = experiment_code)

        Status = queryset[0].experiment_status        
        if (Status == True):
            logging.info("ExperimentAvailableUtil - is_available: Email: " + str(email) + " - Experiment is not available...")
            return Response("1", status=status.HTTP_200_OK)
        
        logging.info("ExperimentAvailableUtil - is_available: Email: " + str(email) + " - Experiment is available...")
        return self.__nextUtil.is_available(email, experiment_code)

class ExperimentOnlineUtil(ExperimentHandlerInterface):

    def __init__(self):
        super().__init__()
        self.__nextUtil = ExperimentAvailableUtil()
        self.__blynk = BlynkBuilder()
    
    def is_available(self, email, experiment_code):
        
        logging.info("ExperimentOnlineUtil - is_available: Email: " + str(email) + " - Checking if experiment is online...")
        queryset = Experiments.objects.filter(experiment_code = experiment_code)

        key = queryset[0].experiment_key
        response = self.__blynk.hardwareStatus(key)

        if (response.status_code == 200):
            if (not response.json()):
                logging.info("ExperimentOnlineUtil - is_available: Email: " + str(email) + " - Experiment is online...")
                return self.__nextUtil.is_available(email, experiment_code)

        logging.info("ExperimentOnlineUtil - is_available: Email: " + str(email) + " - Experiment is not online...")       
        return Response("0", status=status.HTTP_200_OK)
        

class ExperimentExistsUtil(ExperimentHandlerInterface):

    def __init__(self):
        super().__init__()
        self.__nextUtil = ExperimentOnlineUtil()
    
    def is_available(self, email, experiment_code):
        
        logging.info("ExperimentExistsUtil - is_available: Email: " + str(email) + " - Checking if experiment exists...")
        queryset = Experiments.objects.filter(experiment_code = experiment_code)
        
        if (queryset.exists() == False):
            logging.error("ExperimentExistsUtil - is_available: Email: " + str(email) + " - Invalid experiment code...")
            return Response({'Bad Request': 'Invalid experiment code...'}, status=status.HTTP_400_BAD_REQUEST)
        
        logging.info("ExperimentExistsUtil - is_available: Email: " + str(email) + " - Experiment exists...")
        return self.__nextUtil.is_available(email, experiment_code)

class ExperimentHandler:

    def __init__(self, email, experiment_code):
        self.__experiment_code = experiment_code
        self.__email = email
        self.__util = ExperimentExistsUtil()
    
    def isExperimentPossible(self):

        logging.info("ExperimentHandler - isExperimentPossible: Email: " + str(self.__email) + "Experiment Code: " + str(self.__experiment_code) +  " - Checking if experiment is possible...")        
        return self.__util.is_available(self.__email, self.__experiment_code)
