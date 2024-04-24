from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ExperimentSerializer
from .models import Experiments
import requests
from .Blynk import Blynk
# define BLYNK_AUTH_TOKEN "Ay3FUmTkZr9cZb5o_3TtD6D1Wjt0ExSq"
# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class ExperimentView(APIView):
    blynk = Blynk()

    def get(self, request):
        exp_id = request.GET.get('exp_id')
        action = request.GET.get('action')
        exp = Experiments.objects.get(exp_id=exp_id)
        blynk_key = exp.exp_key
        if (action == 'status'):
            response = self.blynk.hardwareStatus(blynk_key)
            # blynk_status = stauts.json()
            if(response.status_code == 200):
                if(not response.json()):
                    return HttpResponse("1",status=status.HTTP_200_OK)
                

        return HttpResponse("0", status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ExperimentSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data)

    def put(self, request):

        exp_id = request.data.get('exp_id')
        action = request.data.get('action')
        value = request.data.get('value')
        exp = Experiments.objects.get(exp_id=exp_id)
        if (exp == None):
            return HttpResponse("Incorrect Experiment ID", status=status.HTTP_400_BAD_REQUEST)
        else:
            blynk_key = exp.exp_key
            header = "token="+blynk_key+"&"+action+"="+value
            status_code = self.blynk.update_data(blynk_key, action, value)
            if (status_code != 200):
                return HttpResponse("Failed to update the device", status=status.HTTP_400_BAD_REQUEST)
            else:
                return HttpResponse("Success", status=status.HTTP_200_OK)
