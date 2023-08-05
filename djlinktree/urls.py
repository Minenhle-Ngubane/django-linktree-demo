from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path("dj-admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    
    path("auth/api/", include("authentication.urls")),
    path("user/api/", include("user.urls")),
    path("link/api/", include("link.urls")),
    path("settings/api/", include("settings.urls")),
    path("public/api/", include("public.urls")),
    
    path("", TemplateView.as_view(template_name="index.html")),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # SERVE STATIC AND MEDIA FILES FROM DEVELOPMENT SERVER
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)