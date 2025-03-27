from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status , viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer , UserGroupAllocSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model

# define user Model here 
from .models import UserGroupAlloc, NewUser
from atlip.models import GroupPortfolio




# api endpoint to get user data 
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure that only authenticated users can access this view

    def get(self, request):
        user = request.user  # Get the currently authenticated user
        print( request.user , "user")
        data = {
            "username": user.user_name,
            "email": user.email,
            "is_superuser": user.is_superuser, 
            # Add other fields you want to return
        }
        return Response(data, status=status.HTTP_200_OK)


# Api to fetch user details using user id 


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]  # Only superusers can access

    def get(self, request, user_id):
        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
            data = {
                "id": user.id,
                "username": user.user_name,
                "email": user.email,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff,
                "is_active" : user.is_active, 
                "is_superuser":user.is_superuser, 
                
                "groups": [group.name for group in user.groups.all()],  # Fetch user's groups
            }
            return Response(data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class CustomUserCreate(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only logged-in users can create users

    def post(self, request, format='json'):
        print(request.data)  # Debugging

        # Get role data from request (if provided)
        is_superuser = request.data.get('is_superuser', False)
        is_admin = request.data.get('is_admin', False)
        is_staff = request.data.get('is_staff', False)

        # Ensure only superusers can create another superuser
        if is_superuser and not request.user.is_superuser:
            return Response(
                {"error": "You must be a superuser to create another superuser."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Validate and create user
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_superuser=is_superuser, is_admin=is_admin, is_staff=is_staff)

            return Response(
                {"id": user.id, "email": user.email, "user_name": user.user_name},  # Ensure `id` is returned
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# Api to delete user 
class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id=None):
        # Check if the authenticated user is a superuser
        if not request.user.is_superuser:
            return Response(
                {"error": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Ensure a valid user ID is provided
        if not user_id:
            return Response(
                {"error": "User ID is required to delete a user."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Retrieve the user without deleting related data
            user_to_delete = get_object_or_404(NewUser, id=user_id)

            print( user_to_delete )
            print(user_to_delete)  # This will print the model object representation (based on __str__)

            # Optionally, print all fields of the user
            for field in user_to_delete._meta.fields:
                print(f"{field.name}: {getattr(user_to_delete, field.name)}")

            if user_to_delete.is_superuser:
                return Response(
                    {"error": "Cannot delete another superuser."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Delete the user
            user_name = user_to_delete.user_name
            user_to_delete.delete()

            return Response(
                {"message": f"User '{user_name}' with ID {user_id} has been deleted successfully. Related data remains intact."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(f"Error deleting user {user_id}: {e}")
            return Response(
                {"error": "An error occurred while attempting to delete the user."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Helper function for role 
# Helper function to determine user role
def get_user_role(user):
    if user.is_superuser:
        return "Superuser"
    elif user.is_admin:
        return "Partner"
    elif user.is_staff:
        return "Client"
    else:
        return "Inactive"




# list all user 
class ListUsersView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # Check if the authenticated user is a superuser
        if not request.user.is_superuser:
            return Response(
                {"error": "You do not have permission to view this information."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Retrieve all users (using your custom user model)
        users = NewUser.objects.all()

        # Serialize user data
        # Serialize user data
        user_data = [
            {
                "id": user.id,
                "username": user.user_name,  # Access user_name instead of username
                "email": user.email,
                "role": get_user_role(user),  # Determine if user is superuser, admin, or staff
                "is_active": user.is_active,  # Check if the user should be active or not
                "first_name": user.first_name,
                "start_date": user.start_date,
                # "about": user.about,  # Uncomment if needed
                # Add more fields as needed
            }
            for user in users
        ]


        return Response(user_data, status=status.HTTP_200_OK)
    

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from users.models import UserGroupAlloc, GroupPortfolio, NewUser
from users.serializers import UserGroupAllocSerializer

class UserGroupAllocViewSet(viewsets.ModelViewSet):
    queryset = UserGroupAlloc.objects.all()
    serializer_class = UserGroupAllocSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def create(self, request, *args, **kwargs):
        """POST API to allocate a user to multiple groups"""
        print(request.data, "grp alloc")  # Debugging

        user_id = request.data.get("user")
        group_ids = request.data.get("groups", [])

        if not user_id or not group_ids:
            return Response({"error": "User and groups fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = NewUser.objects.get(id=user_id)
        except NewUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        created_allocs = []
        for group_id in group_ids:
            try:
                group = GroupPortfolio.objects.get(id=group_id)
                alloc, created = UserGroupAlloc.objects.get_or_create(user=user, group=group)  # Prevent duplicates
                if created:
                    created_allocs.append(alloc)
            except GroupPortfolio.DoesNotExist:
                return Response({"error": f"Group with ID {group_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        response_data = {
            "user": user_id,
            "groups": [alloc.group.id for alloc in created_allocs]
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        """GET API to fetch all user-group allocations"""
        allocations = UserGroupAlloc.objects.all()
        serializer = self.get_serializer(allocations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>[^/.]+)')
    def get_allocations_by_user(self, request, user_id=None):
        """GET API to fetch groups allocated to a specific user"""
        try:
            user = NewUser.objects.get(id=user_id)
        except NewUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        allocations = UserGroupAlloc.objects.filter(user=user)
        serializer = self.get_serializer(allocations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """DELETE API to remove an allocation"""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Allocation removed successfully"}, status=status.HTTP_204_NO_CONTENT)