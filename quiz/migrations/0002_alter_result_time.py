# Generated by Django 4.0 on 2022-01-30 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='time',
            field=models.DateField(auto_now_add=True),
        ),
    ]