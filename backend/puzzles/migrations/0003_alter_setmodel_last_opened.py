# Generated by Django 4.1 on 2022-09-27 22:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzles', '0002_setmodel_last_opened'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setmodel',
            name='last_opened',
            field=models.DateField(default=datetime.datetime(2022, 9, 27, 22, 25, 32, 520304, tzinfo=datetime.timezone.utc)),
        ),
    ]
