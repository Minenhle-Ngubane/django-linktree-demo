from django.db import models
from django.utils.translation import gettext_lazy as _
from ordered_model.models import OrderedModel

from utils.upload import upload_thumbnail_to
from task.tasks import update_link_visibility_status


class Link(OrderedModel):
    """
    Represents a link with an owner, title, URL, visibility status, and thumbnail.

    If either title or URL is missing, the link will not be visible.
    """
    owner = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="links")
    title = models.CharField(_("title"), max_length=255, blank=True, null=True)
    url = models.URLField(_("url"), blank=True, null=True)
    is_visible = models.BooleanField(_("link visibility status"), default=True)
    url_thumbnail = models.URLField(_("url reference thumbnail"), blank=True, null=True)

    upload_thumbnail = models.ImageField(
        _("uploaded thumbnail"),
        upload_to=upload_thumbnail_to,
        blank=True,
        null=True,
    )

    go_live_at = models.DateTimeField(_("schedule link to go live"), blank=True, null=True)

    def __str__(self):
        """
        Returns the title, URL, or a dash if both title and URL are empty.
        """
        return self.title or self.url or "-"

    def clean(self):
        """
        Sets the link's visibility status to False if either title or URL is missing.
        """
        if not self.title or not self.url:
            self.is_visible = False

    def save(self, *args, **kwargs):
        """
        Cleans the link before saving and schedules an asynchronous task if go_live_at is set.
        """
        self.clean()
        super().save(*args, **kwargs)

        if self.go_live_at and not self.is_visible:
            update_link_visibility_status.apply_async(args=(self.pk,), eta=self.go_live_at)

    class Meta(OrderedModel.Meta):
        verbose_name = _("Link")
        verbose_name_plural = _("Links")
        ordering = ["-id"]