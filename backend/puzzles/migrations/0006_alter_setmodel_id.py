# Generated by Django 4.1 on 2022-09-30 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzles', '0005_alter_setmodel_last_opened'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setmodel',
            name='id',
            field=models.SlugField(allow_unicode=True, default='bpuWGw', primary_key=True, serialize=False),
        ),
    ]