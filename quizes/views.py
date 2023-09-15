from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView
from django.http import JsonResponse
from questions.models import Question, Answer
from results.models import Result

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
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        msj = 'if'
        questions = []
        data = request.POST
        ord_data = dict(data.lists())
        ord_data.pop('csrfmiddlewaretoken')
        for q_text in ord_data.keys():
            question = Question.objects.get(text=q_text)
            questions.append(question)

        user = request.user
        quiz = Quiz.objects.get(pk=pk)
        score = 0
        multiplier = 100/quiz.no_of_questions
        results = []
        correct_answer = None
        for q in questions:
            a_selected = request.POST.get(q.text)
            if a_selected != '':
                question_answers = Answer.objects.filter(question=q)
                for a in question_answers:
                    if a_selected == a.text:
                        if a.correct:
                            score +=1
                            correct_answer = a.text
                        else:
                            if a.correct:
                                correct_answer = a.text
                                
                results.append({str(q): {'correct_answer': correct_answer, 'answered': a_selected} })       
            else:
                results.append({str(q): 'not answered' })

        total_score = multiplier * score
        Result.objects.create(quiz=quiz, user=user, score=total_score)

        if total_score >= quiz.required_score_to_pass:
            return JsonResponse({'passed': True, 'score': total_score, 'result': results })
        else:
            return JsonResponse({'passed': False, 'score': total_score, 'result': results })