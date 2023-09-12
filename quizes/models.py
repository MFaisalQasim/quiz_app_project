from django.db import models

LEVEL_CHOICES = (
    ('easy', 'easy'),
    ('medium', 'medium'),
    ('hard', 'hard'),
)
class Quiz(models.Model):

    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    no_of_questions = models.IntegerField()
    time = models.IntegerField(help_text="time duration for this quiz")
    required_score_to_pass = models.IntegerField(help_text="min score required for this quiz")
    diffculty = models.CharField(max_length=6, choices=LEVEL_CHOICES)

    def __str__(self) :
        return f"{self.name}-{self.topic}"
    
    def get_questions(self) :
        return self.question_set.all()[:self.no_of_questions]
    
    class Meta :
        verbose_name_plural = 'Quizes'