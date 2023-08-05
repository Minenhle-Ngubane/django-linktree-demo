from rest_framework import serializers
from .models import  SocialLink, SeoMetaData
from user.serializers import UserSerializer


class SocialLinkSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = SocialLink
        fields = ["id", "owner", "icon", "aliase", "url", "is_added", "is_visible"]
        
        
class SeoMetaDataSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = SeoMetaData
        fields = ["id", "owner", "title", "description"]