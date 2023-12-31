from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "StudyBud Admin"
admin.site.site_title = "StudyBud Admin Portal"
admin.site.index_title = "Welcome to StudyBud Researcher Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('quizes.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_URL)