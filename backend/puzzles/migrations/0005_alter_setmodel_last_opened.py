# Generated by Django 4.1 on 2022-09-27 22:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzles', '0004_alter_setmodel_last_opened'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setmodel',
            name='last_opened',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
