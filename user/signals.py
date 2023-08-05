from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User, Profile
from settings.models import SeoMetaData


@receiver(post_save, sender=User)
def create_user_profile_and_seo(sender, instance, created, **kwargs):
    """
    Signal handler to create a Profile and SeoMetaData instance for the User when a new User is created.
    
    Parameters:
        sender: The model class that sent the signal (User in this case).
        instance: The User instance that was just created.
        created: A boolean indicating if the User was just created.

    Returns:
        None
    """
    if created:
        Profile.objects.create(owner=instance)
        SeoMetaData.objects.create(owner=instance)


@receiver(post_save, sender=User)
def save_user_profile_and_seo(sender, instance, **kwargs):
    """
    Signal handler to save the Profile and SeoMetaData instance for the User when the User is saved.

    Parameters:
        sender: The model class that sent the signal (User in this case).
        instance: The User instance that was just saved.

    Returns:
        None
    """
    instance.profile.save()
    instance.seo_meta_data.save()