from django.urls import path
from .views import (
    SocialLinkListCreateView, 
    SocialLinkRetrieveUpdateDestroyView, 
    SeoMetaDataRetrieveUpdateDestroyView
)

urlpatterns = [
    path("social-links/", SocialLinkListCreateView.as_view(), name="social_link_list_create"),
    path("social-links/<int:pk>/", SocialLinkRetrieveUpdateDestroyView.as_view(), name="social_link_retrieve_update_destroy"),
    path("seo-meta-data/<int:pk>/", SeoMetaDataRetrieveUpdateDestroyView.as_view(), name="seo_meta_data"),
]
