from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    image=models.ImageField( upload_to="user",blank=True )
    is_student = models.BooleanField('student status', default=False,blank=True)
    is_teacher = models.BooleanField('teacher status', default=False,blank=True)
AUTH_USER_MODEL = 'quiz.User'

class Question(models.Model):
    CHOICES = [
        ("answer1", 'answer1'),
        ("answer2", 'answer2'),
        ("answer3", 'answer3'),
        ("answer4", 'answer4'),
    ]
    mark=models.PositiveIntegerField()
    quiz=models.ForeignKey("Quiz", on_delete=models.CASCADE)
    question=models.CharField(max_length=250,blank=False)
    answer1=models.CharField(max_length=250,blank=False)
    answer2=models.CharField(max_length=250,blank=False)
    answer3=models.CharField(max_length=250,blank=False)
    answer4=models.CharField(max_length=250,blank=False)
    true_answer=models.CharField(max_length=20,choices=CHOICES,blank=False)
    def __str__(self):
        return self.question
    

class Quiz(models.Model):
    name=models.CharField(max_length=150)
    total_marks=models.PositiveIntegerField()
    teacher=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Result(models.Model):
    quiz=models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_marks=models.PositiveIntegerField()
    time =models.DateField( auto_now_add=True)
    def __str__(self):
        return self.user.username +"  took  "+self.quiz.name +" and got "+str(self.total_marks)


from django.db.models.signals import pre_save

def updateuser(sender,instance, **kwargs):
    if instance.email !="":
        instance.username=instance.email


pre_save.connect(updateuser,sender=User)
