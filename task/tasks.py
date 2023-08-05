from celery import shared_task
from django.utils import timezone


@shared_task
def update_link_visibility_status(link_id: int) -> None:
   try:
      link = Link.objects.get(pk=link_id)
      current_datetime = timezone.now()
      if link.go_live_at and link.go_live_at <= current_datetime:
         link.is_visible = True
         link.save()
   except Link.DoesNotExist:
      pass