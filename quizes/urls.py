from django.contrib import admin
from django.urls import path, include
from quizes import views as qviews
# from .views import (
# QuizListView
# )
# from django.conf import settings
# from django.conf.urls.static import static

urlpatterns = [
    path('', (qviews.QuizListView).as_view(), name='all-quizes'),
    # path('', QuizListView.as_view(), name='all-quizes'),
    path('quize/<str:pk>', qviews.quiz_view)
]
