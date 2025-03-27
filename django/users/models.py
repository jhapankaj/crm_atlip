from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from atlip.models import GroupPortfolio  # Import GroupPortfolio model




class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_admin', True)  # Ensure superuser is also an admin

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
        if other_fields.get('is_admin') is not True:
            raise ValueError(
                'Superuser must be assigned to is_admin=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    #about = models.TextField(_('about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # Inherited from PermissionsMixin, explicitly added here
    is_admin = models.BooleanField(default=False)  # Custom field for admin users

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return self.user_name

    def save(self, *args, **kwargs):
        # Automatically set is_admin to True if the user is a superuser
        if self.is_superuser:
            self.is_admin = True
        super().save(*args, **kwargs)



class UserGroupAlloc(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, related_name="allocated_groups")
    group = models.ForeignKey(GroupPortfolio, on_delete=models.PROTECT, related_name="allocated_users")
    allocated_at = models.DateTimeField(auto_now_add=True)  # Stores allocation timestamp

    class Meta:
        unique_together = ('user', 'group')  # Prevents duplicate allocations

    def __str__(self):
        return f"{self.user.user_name} -> {self.group.group_name}"