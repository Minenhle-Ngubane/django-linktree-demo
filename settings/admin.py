from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Icon, SocialLink, SeoMetaData


@admin.register(Icon)
class IconAdmin(admin.ModelAdmin):
    model = Icon
    list_display = ("name",)
    list_filter = ("name", "icon")
    search_fields = ("name", "icon")
    ordering = ("name",)
    fieldsets = (
        (_("Icon Details"), {"fields": ("name", "icon")}),
    )
    
    
@admin.register(SocialLink)
class SocialLinksAdmin(admin.ModelAdmin):
    model = SocialLink
    list_display = ("owner", "icon", "url")
    list_filter = ("icon", "url")
    search_fields = ("icon", "url")
    ordering = ("icon",)
    fieldsets = (
        (_("Admin"), {"fields": ("owner", "is_added")}),
        (None, {"fields": ("icon", "aliase", "url", "is_visible")}),
    )
    list_select_related = ("owner",)
    
    
@admin.register(SeoMetaData)
class SeoMetaDataAdmin(admin.ModelAdmin):
    model = SeoMetaData
    list_display = ("owner", "title", "description")
    list_filter = ("title", "description")
    search_fields = ("title", "description")
    ordering = ("title",)
    fieldsets = (
        (_("Admin"), {"fields": ("owner",)}),
        (None, {"fields": ("title", "description",)}),
    )
    list_select_related = ("owner",)