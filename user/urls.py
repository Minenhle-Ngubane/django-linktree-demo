from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRetrieveUpdateView, get_routes


urlpatterns = [
    path("user/", UserRetrieveUpdateView.as_view(), name="user_retrieve_update"),
    path("", get_routes),
]