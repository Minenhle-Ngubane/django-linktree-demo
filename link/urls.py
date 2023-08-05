from django.urls import path
from .views import LinkListCreateView, LinkRetrieveUpdateDestroyView

urlpatterns = [
    path("links/", LinkListCreateView.as_view(), name="link_list_create"),
    path("links/<int:pk>/", LinkRetrieveUpdateDestroyView.as_view(), name="link_retrieve_update_destroy"),
]
