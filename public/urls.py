from django.urls import path
from .views import UserPublicPageView

urlpatterns = [
    path("<str:username>/", UserPublicPageView.as_view(), name="user_public_page"),
]
