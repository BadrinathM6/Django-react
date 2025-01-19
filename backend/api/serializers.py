from .models import UserModel
from rest_framework import serializers

class NameUserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    password2 = serializers.CharField(write_only = True, required = True)

    class Meta:
        model = UserModel
        fields = ("username", "password", "password2", "date_of_join", "is_active", "is_admin")
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True},
        }
    def validate_username(self, value):
        if UserModel.objects.filter(username = value).exists():
            raise serializers.ValidationError("The username is already taken")
        return value
    def create(self, validated_data):
        validated_data.pop("password2")
        user = UserModel.objects.create_user(**validated_data)
        return user
    def validate(self, attrs):
        if attrs.get("password") != attrs.get("password2"):
            raise serializers.ValidationError({"password": "Password and confirm password didn't match"})
        return attrs