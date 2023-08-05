from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response

from user.models import User


class UserPublicPageView(APIView):
    def get(self, request, username: str) -> Response:
        """
        Get user's public page data.

        Parameters:
            request (HttpRequest): The HTTP request object.
            username (str): The username of the user whose public page data is requested.

        Returns:
            Response: JSON response containing user's public page data.
                      If the user is not found, returns a 404 HTTP response.
        """
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise Http404("User not found")

        user_data = {
            "username": user.username,
            "email": user.email,
            "name": user.name,
            "profile": {
                "id": user.profile.id,
                "avatar": user.profile.avatar.url if user.profile.avatar else None,
                "title": user.profile.title,
                "bio": user.profile.bio,
            },
            "links": [
                {
                    "title": link.title,
                    "url": link.url,
                    "is_visible": link.is_visible,
                }
                for link in user.links.all()
            ],
            "icons": [
                {
                    "icon": link.icon,
                    "aliase": link.aliase,
                    "url": link.url,
                    "is_visible": link.is_visible,
                }
                for link in user.social_links.all()
            ],
        }

        return Response(user_data)