from django.contrib.auth.models import  Group
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


from django.contrib.auth import get_user_model

from quiz.models import Question, Quiz, Result
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    superuser=serializers.SerializerMethodField(read_only=True)
    image=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id",'first_name','last_name','username', 'email','password',"is_staff",
        'image' ,'bio','location','birth_date','is_student','is_teacher',"token","superuser"
        ]


    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)
    def get_superuser(self,obj):
        return obj.is_superuser
    def get_image(self,obj):
        return obj.image.url



class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question

        fields = ["id",
            "mark",
    "question",
    "answer1",
    "answer2",
    "answer3",
    "answer4",
    "true_answer",]




class QuizSerializer(serializers.ModelSerializer):
    questions=serializers.SerializerMethodField(read_only=True)
    teacher=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Quiz
        fields = ["id",    "name",'teacher',
    "total_marks","questions"]


    def get_questions(self,obj):
        questions= obj.question_set.all()
        
        serializer=QuestionSerializer(questions,many=True)
        return serializer.data

    def get_teacher(self,obj):

        return obj.teacher.username
 



class ResultSerializer(serializers.ModelSerializer):
    quiz=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    marks=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Result
        fields = ["id",  
    "quiz",
    "user",
    "total_marks",
    "marks",
    "time" ]


    def get_quiz(self,obj):
        quiz= obj.quiz
        return quiz.name

    def get_user(self,obj):
        user= obj.user
        return user.username
    def get_marks(self,obj):
        user= obj.quiz
        return user.total_marks