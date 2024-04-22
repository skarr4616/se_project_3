from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ExperimentSerializer
from .models import Experiments


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class ExperimentView(APIView):
    def get(self,request):
        output = [{'exp_id':output.exp_id,
                   'exp_name':output.exp_name,
                   'exp_status':output.exp_status,
                   'exp_que':output.exp_que,
                   'exp_key':output.exp_key} for output in Experiments.objects.all()]
        # exp = Experiments.objects.all()
        # serializer = ExperimentSerializer(exp,many=True)
        return Response(output)
    
    def post(self,request):
        serializer = ExperimentSerializer(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data)
        
    def put(self,request):

        exp_id = request.data.get('exp_id')
        action = request.data.get('action')
        value = request.data.get('value')
        exp = Experiments.objects.get(exp_id=exp_id)
        if(exp == None):
            return HttpResponse("Incorrect Experiment ID",status=status.HTTP_400_BAD_REQUEST)
        else:
            blynk_key = exp.exp_key
            # Use action (pin no), value and blynk_key to control the device
            return HttpResponse("Success",status=status.HTTP_200_OK)
    
