from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    MyTokenObtainPairView,
    UserRegistrationView,
    DeleteUserAccountView,
    CheckUsernameView,
    CheckEmailView,
    PasswordValidationView,
    PasswordResetRequestView, 
    PasswordResetConfirmView,
)


urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserRegistrationView.as_view(), name="user_registration"),
    path("delete/", DeleteUserAccountView.as_view(), name="delete_user_account"),
    path("check-username/", CheckUsernameView.as_view(), name="check_username"),
    path("check-email/", CheckEmailView.as_view(), name="check_email"),
    path("validate-password/", PasswordValidationView.as_view(), name="validate_password"),
    path("password/reset/", PasswordResetRequestView.as_view(), name="password_reset_request"),
    path("password/reset/confirm/<str:uidb64>/<str:token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
]