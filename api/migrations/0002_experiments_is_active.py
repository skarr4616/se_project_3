# Generated by Django 3.2.18 on 2024-04-24 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='experiments',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
