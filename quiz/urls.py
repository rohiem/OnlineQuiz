from .views import *
from django.urls import path

urlpatterns = [
    path('register',register_user,name='register_user'),
    path('login',login_user,name='login_user'),
    path('choose_teacher_admin/<int:id>',choose_teacher_admin,name='choose_teacher_admin'),
    path('get_teacher',get_teacher,name='get_teacher'),
    path('get_quizzes',get_quizzes,name='get_quizzes'),
    path('get_quizzes_by_teacher',get_quizzes_by_teacher,name='get_quizzes_by_teacher'),
    path('get_quiz/<int:id>',get_quiz,name='get_quiz'),
    path('get_quiz_by_teacher/<int:id>',get_quiz_by_teacher,name='get_quiz'),
    path('get_quistion/<int:id>',get_quistion,name='get_quistion'),
    path('post_answers/<int:id>',post_answers,name='post_answers'),
    path('get_result_by_user',get_result_by_user,name='get_result_by_user'),
    path('get_result_by_quiz/<int:id>',get_result_by_quiz,name='get_result_by_quiz'),
    path('post_quiz',post_quiz,name='post_quiz'),
    path('post_question/<int:id>',post_question,name='post_question'),
    path('get_profile',get_profile,name='get_profile'),
    path('update_profile',update_profile,name='update_profile'),
]