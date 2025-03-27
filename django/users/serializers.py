from rest_framework import serializers
from users.models import NewUser, UserGroupAlloc


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating custom user with roles.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(min_length=8, write_only=True)
    is_superuser = serializers.BooleanField(required=False, default=False)
    is_admin = serializers.BooleanField(required=False, default=False)
    is_staff = serializers.BooleanField(required=False, default=False)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'first_name', 'password', 'is_superuser', 'is_admin', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print( "validated_data" , validated_data )
        password = validated_data.pop('password', None)
        # As long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        
        # Set the password securely
        if password is not None:
            instance.set_password(password)
        
        # Automatically activate the user when created
        instance.is_active = True

        # Ensure superuser role is set correctly
        if instance.is_superuser:
            instance.is_admin = True  # Automatically make a superuser an admin
        
        instance.save()
        return instance
    

class UserGroupAllocSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.user_name', read_only=True)
    group_name = serializers.CharField(source='group.group_name', read_only=True)

    class Meta:
        model = UserGroupAlloc
        fields = ['id', 'user', 'user_name', 'group', 'group_name', 'allocated_at']