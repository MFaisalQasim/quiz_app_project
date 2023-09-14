from django.contrib import admin
from django.urls import path, include
from quizes import views as qviews

urlpatterns = [
    path('', (qviews.QuizListView).as_view(), name='all-quizes'),
    path('quize/<pk>', qviews.quiz_view),
    path('quize/<pk>/quize-data', qviews.quiz_data_view),
    path('quize/<pk>/quize-data-save', qviews.quize_data_save)
    
]
