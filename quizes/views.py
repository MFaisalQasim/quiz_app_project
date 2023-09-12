from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView

class QuizListView(ListView):
    model = Quiz
    template_name = 'quizes/main.html'

def quiz_view(request, pk):
    quiz = Quiz.objects.get(id=pk)
    return render(request, 'quizes/quiz.html', {'obj': quiz})