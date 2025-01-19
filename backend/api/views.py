from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import NameUserSerializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = NameUserSerializers(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registeration Successful"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"Message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        serializer = authenticate(username = username, password = password)

        if serializer is not None:
            refresh = RefreshToken.for_user(serializer)
            return  Response({
                "refresh_token": str(refresh),
                "Access_token": str(refresh.access_token),
                'message': "Login Successful"})
        else:
            return Response({"message": "Invalid Credentials"},status=status.HTTP_200_OK)


class HomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = NameUserSerializers(request.user)
        return Response(serializer.data)