# Generated by Django 4.1 on 2022-10-03 01:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0007_alter_taskmodel_lastcompletion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskmodel',
            name='lastCompletion',
            field=models.DateField(default=datetime.date(2022, 10, 1)),
        ),
    ]