from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from user.custom_permissions import IsOwner
from .models import SeoMetaData, SocialLink
from .serializers import SeoMetaDataSerializer, SocialLinkSerializer


class SocialLinkListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create social links.
    """
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return SocialLink.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SocialLinkRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, and delete a social link.
    """
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return SocialLink.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class SeoMetaDataRetrieveUpdateDestroyView(generics.GenericAPIView):
    """
    API view to retrieve, update, and delete SEO metadata.
    """
    serializer_class = SeoMetaDataSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return SeoMetaData.objects.filter(owner=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset)
        return obj