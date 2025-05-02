from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, CardViewSet, CardImageViewSet

app_name = "catalog"

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"cards", CardViewSet, basename="card")
router.register(
    r"cards/(?P<card_pk>\d+)/images", CardImageViewSet, basename="cardimage"
)

urlpatterns = [
    path("", include(router.urls)),
]
