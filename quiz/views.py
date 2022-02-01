from pytz import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import render
from .models import*
from .serializers import *
from django.contrib.auth.hashers import make_password
from rest_framework import exceptions, status
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser

from django.contrib.auth import authenticate, get_user_model, login
User = get_user_model()
import datetime
'''
from django.conf import settings
User=settings.AUTH_USER_MODEL
'''
# Create your views here.
@permission_classes([AllowAny,])
@api_view(["POST"])
def register_user(request):
    def TorF(data):
        if data=="True":
            return True
        return False
    try:
        data=request.data
        user=User.objects.create(
            first_name=data["first_name"],
            last_name=data["last_name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password1"]),
           # password2=make_password(data["password2"]),
            image=request.FILES.get("image"),
            bio=data['bio'], 
            location=data["location"], 
            birth_date=data["birth_date"], 
            is_student=TorF(data["is_student"]),
            is_teacher=TorF(data["is_teacher"]),
        )
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":"the email provided already exist"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@permission_classes([AllowAny,])
@api_view(["POST"])
def login_user(request):
    try:
        data=request.data
        username=data["email"]
        password=data["password"]
        user=authenticate(username=username, password=password)
        print(user)
        if user is not None :
            login(request,user)
           
     
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_teacher(request):
    try:
        print(request.user)
        if request.user.is_superuser==True:
            userTeacher=User.objects.filter(is_teacher=True).filter(is_staff=False)
            serializer=UserSerializer(userTeacher,many=True)
            return Response(serializer.data)
        else:
            message={"detail":"you arent supper user"}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@permission_classes([IsAuthenticated,])
@api_view(["POST"])
def choose_teacher_admin(request,id):
    try:
        print(request.user)
        userTeacher=User.objects.get(is_teacher=True,id=id,is_staff=False)
        print(userTeacher)
        userTeacher.is_staff=True
        userTeacher.save()
        serializer=UserSerializer(userTeacher,many=False)
        return Response(serializer.data)
            
    except User.DoesNotExist:
        message={"detail":"object doesnot exist"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_quizzes(request):
    try:
        quizes=Quiz.objects.all()
        serializer=QuizSerializer(quizes,many=True)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_quizzes_by_teacher(request):
    try:
        quizes=Quiz.objects.filter(teacher=request.user)
        serializer=QuizSerializer(quizes,many=True)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
get_quizzes_by_teacher

@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_quiz_by_teacher(request,id):
    try:
        quizes=Quiz.objects.get(id=id)
        serializer=QuizSerializer(quizes,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_quiz(request,id):
    try:
        if not request.user.is_staff:
            quiz=Quiz.objects.get(id=id)
            serializer=QuizSerializer(quiz,many=False)
            return Response(serializer.data)
        else:
            message={"detail":"user isn't student"}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)    
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_quistion(request,id):
    try:
        question=Question.objects.get(id=id)
        serializer=QuestionSerializer(question,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["POST"])
def post_answers(request,id):
    try:
        data=request.data
        user=request.user
        quiz=Quiz.objects.get(id=id)
        result=Result.objects.create(quiz=quiz,
        user=user,
        total_marks=data["total"],
)

        serializer=ResultSerializer(result,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_result_by_user(request):
    try:
        result=Result.objects.filter(user=request.user).last()
        serializer=ResultSerializer(result,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_result_by_quiz(request,id):
    try:
        quiz=Quiz.objects.get(id=id)
        result=Result.objects.filter(quiz=quiz)
        serializer=ResultSerializer(result,many=True)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)




@permission_classes([IsAuthenticated,])
@api_view(["POST"])
def post_quiz(request):
    try:
        data=request.data
        user=request.user
        if user.is_staff:
            quiz=Quiz.objects.create(
                name=data["name"],
                total_marks=data["marks"],
                teacher=user
            )
            serializer=QuizSerializer(quiz,many=False)
            return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@api_view(["POST"])
def post_question(request,id):
    try:
        data=request.data
        user=request.user
        quiz=Quiz.objects.get(id=id)

        if user.is_staff and int(user.id)==int(quiz.teacher.id):

            question=Question.objects.create(
                mark=int(data["marks"]),
                quiz=quiz ,
                question=data["question"],
                answer1=data["answer1"],                
                answer2=data["answer2"],
                answer3=data["answer3"],                
                answer4=data["answer4"],
                true_answer=data["true_answer"],

            )
            serializer=QuestionSerializer(question,many=False)
            return Response(serializer.data)
        else:
            message={"detail":"you arenot the teacher of this quiz"}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)    
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@permission_classes([IsAuthenticated,])
@api_view(["GET"])
def get_profile(request):
    try:
        user=User.objects.get(id=request.user.id)
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)




@permission_classes([IsAuthenticated,])
@api_view(["PUT"])
def update_profile(request):

    def TorF(data):
        if data=="True":
            return True
        return False
    try:
        data=request.data
        user=User.objects.get(id=request.user.id)
        user.first_name=data["first_name"]
        user.last_name=data["last_name"]
        user.username=data["username"]
        user.email=data["email"]
        # user.password=data["password1"]
           # password2=make_password(data["password2"]),
        user.image=request.FILES.get("image")
        user.bio=data['bio']
        user.location=data["location"]
        user.birth_date=data["birth_date"]
        user.is_student=TorF(data["is_student"])
        user.is_teacher=TorF(data["is_teacher"])
        user.save()
    
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"detail":str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
