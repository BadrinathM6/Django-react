from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser

class UserModel(AbstractUser):
    date_of_join = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    def create_user(self, **validated_data):
        password = validated_data.pop("password", None)
        user = self.__class__(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def __str__(self):
        return self.username