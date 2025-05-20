from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(
        max_length=60,
        unique=True,
        verbose_name="Почта",
        db_index=True,
    )
    username = models.CharField(
        max_length=100, unique=False, verbose_name="Имя пользователя", db_index=True
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.email
