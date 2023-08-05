from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from ordered_model.admin import OrderedModelAdmin
from .models import Link


@admin.register(Link)
class LinkAdmin(OrderedModelAdmin):
    list_display = ("display_thumbnail", "owner", "title", "url", "is_visible", 'move_up_down_links')
    list_filter = ("is_visible",)
    search_fields = ("owner__email", "title", "url")
    ordering = ("order",)

    fieldsets = (
        (_("Admin"), {"fields": ("owner",)}),
        (_("Link Details"), {"fields": ("title", "url", "is_visible", "go_live_at")}),
        (_("Thumbnail"), {"fields": ("url_thumbnail", "upload_thumbnail")}),
    )

    def display_thumbnail(self, obj: Link) -> str:
        if obj.upload_thumbnail:
            return format_html('<img src="{}" width="30" height="30" />', obj.upload_thumbnail.url)
        elif obj.url_thumbnail:
            return format_html('<img src="{}" width="30" height="30" />', obj.url_thumbnail)
        else:
            return ""

    display_thumbnail.short_description = _("Thumbnail")
