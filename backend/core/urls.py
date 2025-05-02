from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from core import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("apps.users.urls", namespace="users")),
    path("api/catalog/", include("apps.catalog.urls", namespace="catalog")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
