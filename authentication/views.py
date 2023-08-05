from typing import Dict, Any

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetConfirmView
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView

from user.models import User
from .serializers import (
    MyTokenObtainPairSerializer, 
    UserRegistrationSerializer, 
    PasswordResetRequestSerializer, 
    PasswordResetConfirmSerializer,
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    

class DeleteUserAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request) -> Response:
        user = request.user
        data: Dict[str, Any] = request.data
        password: str = data.get("password", "")

        if not password:
            return Response({"detail": "Please provide your password to confirm account deletion."},
                status=status.HTTP_400_BAD_REQUEST)

        authenticated_user = authenticate(username=user.username, password=password)
        if not authenticated_user:
            return Response({"detail": "Incorrect password. Account deletion failed."},
                status=status.HTTP_401_UNAUTHORIZED)

        try:
            user.delete()
            return Response({"detail": "Account deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": "An error occurred while deleting the account."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class PasswordResetRequestView(APIView):
    def post(self, request) -> Response:
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            token = default_token_generator.make_token(user)
            user.password_reset_token = token
            user.save()

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"http://localhost:3000/password/reset/confirm/{uid}/{token}/"
            reset_link = request.build_absolute_uri(reset_url)
            
            html_message = render_to_string(
                "authentication/password_reset_email.html",
                {
                    "reset_link": reset_link,
                    "username": user.username
                },
            )

            subject = "Django Linktree Demo | Reset your password"
            text_message = strip_tags(html_message) 
            from_email = "minenhlengubane17@gmail.com"
            recipient_list = [email]
            mail = EmailMultiAlternatives(subject, text_message, from_email, recipient_list)
            mail.attach_alternative(html_message, "text/html")
            mail.send(fail_silently=False)

            return Response({"detail": "Password reset email sent"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token) -> Response:
        serializer = PasswordResetConfirmSerializer(data=request.data, context=self.get_serializer_context(uidb64, token))
        if serializer.is_valid():
            user = serializer.get_user()
            if user is not None:
                if default_token_generator.check_token(user, token):
                    user.set_password(serializer.validated_data["password"])
                    user.save()
                    return Response({"detail": "Password reset successful"})
                else:
                    return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"detail": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_context(self, uidb64, token):
        return {"uidb64": uidb64, "token": token}
    
    
class CheckUsernameView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request: Request) -> Response:
        username: str = request.data.get("username", "")
        if User.objects.filter(username=username).exists():
            return Response({"available": False})
        return Response({"available": True})
    
    
class CheckEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        email: str = request.data.get("email", "")

        if User.objects.filter(email=email).exists():
            return Response({"available": False})

        return Response({"available": True})
    

class PasswordValidationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request) -> Response:
        password: str = request.data.get("password")
        errors: List[str] = []
        
        try:
            validate_password(password)
        except ValidationError as e:
            errors = list(e.messages)
        
        return Response({"errors": errors})