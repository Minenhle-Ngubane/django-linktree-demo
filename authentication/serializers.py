from typing import Dict, Any

from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken

from user.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom Token Obtain Pair Serializer.

    This serializer extends the TokenObtainPairSerializer from rest_framework_simplejwt
    to provide additional functionality if needed in the future.
    """

    @classmethod
    def get_token(cls, user: User) -> AccessToken:
        """
        Get the token for the given user.

        Args:
            user (User): The user object for which the token is requested.

        Returns:
            AccessToken: The access token for the user.
        """
        token = super().get_token(user)
        return token


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    This serializer handles user registration by validating email and username uniqueness,
    setting password, and creating a new user instance.

    Attributes:
        email (serializers.EmailField): The email field for user registration.
        username (serializers.CharField): The username field for user registration.
        password (serializers.CharField): The password field for user registration.
    """

    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate the user registration data.

        Args:
            attrs (Dict[str, Any]): The data dictionary with email, username, and password.

        Returns:
            Dict[str, Any]: The validated data dictionary.

        Raises:
            serializers.ValidationError: If the email or username is already registered.
        """
        email = attrs.get("email")
        username = attrs.get("username")
        password = attrs.get("password")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already registered.")

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username is already taken.")

        return attrs

    def create(self, validated_data: Dict[str, Any]) -> User:
        """
        Create a new user instance.

        Args:
            validated_data (Dict[str, Any]): The validated data dictionary.

        Returns:
            User: The newly created user instance.
        """
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["username"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset.

    Attributes:
        email (serializers.EmailField): The email field for password reset request.
    """

    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer for confirming a password reset.

    Attributes:
        password (serializers.CharField): The new password field for password reset.
        token (serializers.CharField): The token field for password reset confirmation.
    """

    password = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(write_only=True, required=True)

    def get_user(self) -> User:
        """
        Get the user associated with the reset token.

        Returns:
            User: The user associated with the reset token or None if not found.
        """
        try:
            uid = force_str(urlsafe_base64_decode(self.context["uidb64"]))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        return user

    def validate_password(self, value: str) -> str:
        """
        Validate the new password.

        Args:
            value (str): The new password to be validated.

        Returns:
            str: The validated password.

        Raises:
            serializers.ValidationError: If the password fails validation.
        """
        user = self.get_user()
        if user is not None:
            try:
                password_validation.validate_password(value, user)
            except ValidationError as e:
                raise serializers.ValidationError(e.messages)
        return value