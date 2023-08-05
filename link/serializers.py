from rest_framework import serializers
from .models import Link

class LinkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Link
        fields = ["id", "title", "url", "is_visible", "url_thumbnail", "go_live_at"]