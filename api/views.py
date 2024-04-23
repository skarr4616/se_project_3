from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from rest_framework import generics
from .serializers import UserCreateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from datetime import datetime
from rtl import settings
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_text
from django.core.mail import EmailMessage

# from django.contrib.auth import get_user_model
# User = get_user_model()

# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserCreateSerializer
#     permission_classes = [AllowAny,]

# # def index(request):
# #     return HttpResponse("Hello, world. You're at the polls index.")

# def home(request):
#     return HttpResponse("Hello, world.")

# def signup(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         username = data['username']
#         email = data['email']
#         password_1 = data['password_1']
#         password_2 = data['password_2']
#         time_account_created = datetime.now()

#         if User.objects.filter(username=username).exists():
#             return JsonResponse({'message': 'User already exists!'})
        
#         if User.objects.filter(email=email).exists():
#             return JsonResponse({'message': 'Email already exists!'})
        
#         if password_1 != password_2:
#             return JsonResponse({'message': 'Passwords do not match!'})
        
#         try:
#             user = User.objects.create_user(username=username, email=email, password=password_1, date_joined=time_account_created)
#             user.is_active = False

#             # Welcome email
#             subject = 'Welcome to Remote Labs!'
#             message = "Welcome to Remote Labs " + user.username + "!\nWe are excited to have you on board!\nWe have sent you a confirmation email to this address to verify your account.\n\nBest,\nRemote Labs Team"
#             from_email = settings.EMAIL_HOST_USER
#             to_email = [user.email]
#             send_mail(subject, message, from_email, to_email, fail_silently=True)

#             current_site = get_current_site(request)
#             email_subject = 'Activate Your Account'
#             email_message = render_to_string('activate_account.html', { # html template needs to be made
#                 'username': user.username,
#                 'domain': current_site.domain,
#                 'uid': urlsafe_base64_encode(force_bytes(user.pk)),
#                 'token': generate_token.make_token(user),
#             })
#             email = EmailMessage(
#                 email_subject,
#                 email_message,
#                 settings.EMAIL_HOST_USER,
#                 [user.email]
#             )
#             email.send(fail_silently=False)
#             return JsonResponse({'message': 'User created successfully!'})
#         except:
#             return JsonResponse({'message': 'User already exists!'})
#     return JsonResponse({'message': 'User already exists!'})

# def signin(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         username = data['username']
#         password = data['password_1']
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful!'})
#         else:
#             return JsonResponse({'message': 'Login failed!'})
#     return JsonResponse({'message': 'Login failed!'})

# def signout(request):
#     logout(request)
#     return JsonResponse({'message': 'Logout successful!'})

# def activate(request, uidb64, token):
#     try:
#         uid = force_text(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except Exception as e:
#         user = None
#     if user is not None and generate_token.check_token(user, token):
#         user.is_active = True
#         user.save()
#         login(request, user)
#         return JsonResponse({'message': 'Account activated successfully!'})
#     return JsonResponse({'message': 'Account activation failed!'})