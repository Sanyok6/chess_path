# Generated by Django 4.1 on 2022-09-25 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_userdata_current_streak'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='claimed',
            field=models.BooleanField(default=False),
        ),
    ]
