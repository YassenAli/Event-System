# Generated by Django 5.0.7 on 2024-08-16 14:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0010_remove_customuser_seatnumber'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='is_admin',
            new_name='is_superuser',
        ),
    ]
