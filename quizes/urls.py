from django.contrib import admin
from django.urls import path, include
from quizes import views as qviews

app_name = 'quizes'

urlpatterns = [
    path('', (qviews.QuizListView).as_view(), name='all-quizes'),
    path('quize/<str:pk>', qviews.quiz_view),
    path('quize/<str:pk>/quize-data', qviews.quiz_data_view),
    path('quize/<str:pk>/quize-data-save', qviews.quize_data_save)
]