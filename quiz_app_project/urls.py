from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "QuizApp Admin"
admin.site.site_title = "QuizApp Admin Portal"
admin.site.index_title = "Welcome to QuizApp Researcher Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('quizes.urls')),
]

urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)