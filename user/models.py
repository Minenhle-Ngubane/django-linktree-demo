from typing import Any

from django.db import models
from django.utils import timezone
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager
from utils.upload import upload_avatar_to


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model representing an authenticated user.

    Fields:
        email (EmailField): The email address of the user (unique and required).
        username (CharField): The username of the user (unique and optional).
        name (CharField): The full name of the user (optional).

        is_staff (BooleanField): Designates whether the user can log into the admin site.
        is_active (BooleanField): Designates whether the user should be treated as active.
        date_joined (DateTimeField): The date and time when the user joined.

    Properties:
        objects (UserManager): The manager for the User model.

    Methods:
        clean(self): Normalize the email address before saving.
        email_user(self, subject: str, message: str, from_email: str = None, **kwargs: Any): Send an email to the user.
    """

    email = models.EmailField(_("email address"), unique=True, blank=False)
    username = models.CharField(_("username"), max_length=255, unique=True, blank=False, null=True)
    name = models.CharField(_("full name"), max_length=255, blank=True, null=True)

    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site.")
    )

    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_("Designates whether this user should be treated as active. Unselect this instead of deleting accounts.")
    )

    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = UserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        """
        Normalize the email address before saving.
        """
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject: str, message: str, from_email: str = None, **kwargs: Any) -> None:
        """
        Send an email to the user.

        Parameters:
            subject (str): The subject of the email.
            message (str): The content of the email.
            from_email (str): The sender's email address (optional).
            **kwargs: Additional keyword arguments for the email.

        Example:
            user.email_user("Welcome to our website", "Thank you for signing up!")
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self) -> str:
        """
        Return a string representation of the user.

        Returns:
            str: The user's full name, username, or email.
        """
        return self.name or self.username or self.email


class Profile(models.Model):
    """
    Model representing a user's profile.

    Fields:
        owner (OneToOneField): The owner of the profile (related to User model).
        avatar (ImageField): The profile picture (optional).
        title (CharField): The profile title (max length: 100, optional).
        bio (CharField): About the user (max length: 80, optional).

    Methods:
        __str__(self) -> str: Return a string representation of the profile.
    """

    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    avatar = models.ImageField(
        _("avatar"),
        upload_to=upload_avatar_to,
        blank=True,
        null=True,
        help_text=_("profile picture")
    )

    title = models.CharField(
        _("title"),
        max_length=100,
        blank=False,
        null=True,
        help_text=_("profile title")
    )

    bio = models.CharField(
        _("bio"),
        max_length=80,
        blank=False,
        null=True,
        help_text=_("about user")
    )

    def __str__(self) -> str:
        """
        Return a string representation of the profile.

        Returns:
            str: The owner's name or username or email followed by "'s Profile".
        """
        owner_name = self.owner.name or self.owner.username or self.owner.email
        return f"{owner_name}'s Profile"

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")