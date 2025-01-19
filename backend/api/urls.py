from django.urls import path
from .views import RegisterView, LoginView, HomeView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="Register"),
    path("login/", LoginView.as_view(), name="login"),
    path('home/', HomeView.as_view(), name = "home"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
