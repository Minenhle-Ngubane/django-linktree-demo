from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Link
from .serializers import LinkSerializer
from user.custom_permissions import IsOwner


class LinkListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating links.

    Requires authentication and only allows access to the owner of the links.
    """
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        Returns the links belonging to the authenticated user.
        """
        return Link.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        """
        Saves the link with the authenticated user as the owner.
        """
        serializer.save(owner=self.request.user)


class LinkRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a link.

    Requires authentication and only allows access to the owner of the link.
    """
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        Returns the link belonging to the authenticated user.
        """
        return Link.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        """
        Saves the updated link with the authenticated user as the owner.
        """
        serializer.save(owner=self.request.user)