# Generated by Django 4.1 on 2022-10-01 01:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_userdata_claimed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdata',
            name='claimed',
        ),
    ]
