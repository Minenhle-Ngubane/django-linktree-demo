from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djlinktree.settings')

app = Celery('djlinktree')

# Load the celery configuration from Django settings.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Discover tasks in all registered Django apps.
app.autodiscover_tasks()
