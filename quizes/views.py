from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView
from django.http import JsonResponse
from questions.models import Question

class QuizListView(ListView):
    model = Quiz
    template_name = 'quizes/main.html'

def quiz_view(request, pk):
    quiz = Quiz.objects.get(id=pk)
    return render(request, 'quizes/quiz.html', {'obj': quiz})

def quiz_data_view(request, pk):
    quiz = Quiz.objects.get(id=pk)
    questions = []
    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({str(q) : answers})

    return JsonResponse({
        'data' : questions,
        'time' : quiz.time
    })

 
def quize_data_save(request, pk):
    print(request.POST)
    if request.ajax:
        questions = []
        data = request.POST
        ord_data = dict(data.list())

        ord_data.pop('csrfmiddlewaretoken')

        for q_text in ord_data.keys():
            question = Question.objects.get(text=q_text)
            questions.append(question)
        print(questions)

        

    return JsonResponse({
        'data' : 'text',
    })