from django.urls import path
from .views import RegisterView, LoginUser, RefreshTokenView, UserProfileView

app_name = "users"

urlpatterns = [
    path("register", RegisterView.as_view(), name="register"),
    path("login", LoginUser.as_view(), name="login"),
    path("refresh", RefreshTokenView.as_view(), name="refresh"),
    path("me", UserProfileView.as_view(), name="me"),
]
