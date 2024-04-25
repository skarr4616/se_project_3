from .models import SlotBookings
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework import status

class ExperimentHandler:
    def __init__(self, experiment_code, email):
        self.experiment_code = experiment_code
        self.email = email

    # TODO fix the return type
    def is_user_eligible(self):
        
        bookings = SlotBookings.objects.filter(
                    experiment_code = self.experiment_code, 
                    slot_date = datetime.today().strftime('%Y-%m-%d'), 
                    slot_time__gte = (datetime.now() + timedelta(hours=5, minutes=30)).strftime('%H:%M:%S')).order_by('slot_time')
        
        if (bookings.count() == 0):
            return Response({'message': 'You have already booked a slot for today'}, status=status.HTTP_400_BAD_REQUEST)
        
        datetime_string = str(bookings[0].slot_date) + " " + str(bookings[0].slot_time)
        slot_time = datetime.strptime(datetime_string, '%Y-%m-%d %H:%M:%S')
        difference = slot_time - (datetime.now() + timedelta(hours=5, minutes=30))  
        return difference > timedelta(minutes=15)

    def is_experiment_available(self):
        pass