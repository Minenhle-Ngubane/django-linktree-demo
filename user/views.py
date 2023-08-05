from typing import Dict, Any

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from .models import Profile, User
from .serializers import UserSerializer, ProfileSerializer


class UserRetrieveUpdateView(APIView):
    """
    API view to retrieve and update the user profile and user information.

    Requires authentication.

    Endpoints:
        GET /user/api/user/
        PUT /user/api/user/

    GET: Returns the user profile and user information for the authenticated user.

    PUT: Updates the user profile and user information for the authenticated user.
         Also handles avatar file upload and removal.

    Request data format for PUT:
    {
        "profile": {
            "avatar": <uploaded_avatar_file>,
            "title": "Profile Title",
            "bio": "About user",
            ...
        },
        "user": {
            "username": "new_username",
            "email": "new_email@example.com",
            "name": "New User Name",
            ...
        },
        "removeAvatar": true  # Set to remove the current avatar
    }

    Response data format for GET and PUT:
    {
        "profile": {
            "id": 1,
            "avatar": "https://example.com/path/to/avatar.png",
            "title": "Profile Title",
            "bio": "About user",
            ...
        },
        "user": {
            "id": 1,
            "username": "username",
            "email": "email@example.com",
            "name": "User Name",
            ...
        }
    }
    """
    permission_classes = [IsAuthenticated]

    def get_profile_and_user(self, request: Request) -> Dict[str, Any]:
        """
        Helper method to get the user profile and user data.

        Parameters:
            request (Request): The request object.

        Returns:
            Dict[str, Any]: Dictionary containing the serialized profile and user data.
        """
        profile = Profile.objects.select_related("owner").get(owner=request.user)
        profile_serializer = ProfileSerializer(profile)
        user_serializer = UserSerializer(request.user)
        return {"profile": profile_serializer.data, "user": user_serializer.data}

    def put_profile_and_user(self, request: Request) -> Response:
        """
        Helper method to update the user profile and user data.

        Parameters:
            request (Request): The request object.

        Returns:
            Response: Response object containing the updated profile and user data
                      or error messages if validation fails.
        """
        profile = Profile.objects.select_related("owner").get(owner=request.user)
        profile_data = request.data.get("profile", {})
        user_data = request.data.get("user", {})
        avatar_file = request.FILES.get("avatar")  # Get the uploaded avatar file
        remove_avatar = request.data.get("removeAvatar")

        profile_serializer = ProfileSerializer(profile, data=profile_data, partial=True)
        user_serializer = UserSerializer(request.user, data=user_data, partial=True)

        if profile_serializer.is_valid(raise_exception=True) and user_serializer.is_valid(raise_exception=True):
            # Save the profile and user data
            profile_serializer.save()
            user_serializer.save()

            # Handle avatar file upload or removal
            if avatar_file:
                profile.avatar = avatar_file
            elif not avatar_file and remove_avatar:
                profile.avatar = None
            profile.save()

            return Response({"profile": profile_serializer.data, "user": user_serializer.data})

        return Response({"profile": profile_serializer.errors, "user": user_serializer.errors}, status=400)

    def get(self, request: Request) -> Response:
        """
        Endpoint to retrieve the user profile and user information.

        Parameters:
            request (Request): The request object.

        Returns:
            Response: Response object containing the profile and user data.
        """
        data = self.get_profile_and_user(request)
        return Response(data)

    def put(self, request: Request) -> Response:
        """
        Endpoint to update the user profile and user information.

        Parameters:
            request (Request): The request object.

        Returns:
            Response: Response object containing the updated profile and user data
                      or error messages if validation fails.
        """
        return self.put_profile_and_user(request)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_routes(request: Request) -> Response:
    """
    Endpoint to get the available routes.

    Parameters:
        request (Request): The request object.

    Returns:
        Response: Response object containing the list of available routes.
    """
    routes: List[str] = [
        "/user/api/user/",
    ]
    return Response(routes)