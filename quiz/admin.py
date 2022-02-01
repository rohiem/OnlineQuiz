from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
from .models import *
class UserAdmin(BaseUserAdmin):
 

    list_display = ('email', 'username', 'password')
    fieldsets = (
        (None, {
            'fields': ('email', 'username', 'password',"first_name","last_name",'image' ,'bio','location','birth_date','is_student','is_teacher'),
        }),
    )
    model = User

admin.site.register(User, UserAdmin)
#admin.site.register(User)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Result)