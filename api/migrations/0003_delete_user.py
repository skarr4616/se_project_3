# Generated by Django 5.0.4 on 2024-04-25 06:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_slotbookings_email'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
