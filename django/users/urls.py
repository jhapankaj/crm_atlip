from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomUserCreate, 
    BlacklistTokenUpdateView, 
    UserProfileView, 
    DeleteUserView, 
    ListUsersView, 
    UserGroupAllocViewSet, 
    UserDetailView
)

app_name = 'users'

# Create a router for viewsets
router = DefaultRouter()
router.register(r'user-group-alloc', UserGroupAllocViewSet, basename="user-group-alloc")

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('userdata/', UserProfileView.as_view(), name='userdata'),
    path('delete-user/<int:user_id>/', DeleteUserView.as_view(), name='delete_user'),
    path('list_users/', ListUsersView.as_view(), name='list_users'),
    path('user/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),  # New API for fetching user by ID
    # Include UserGroupAllocViewSet URLs
    path('', include(router.urls)),  
]