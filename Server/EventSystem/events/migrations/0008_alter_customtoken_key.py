# Generated by Django 5.0.7 on 2024-07-25 21:00

import events.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0007_customtoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customtoken',
            name='key',
            field=models.CharField(default=events.models.generate_token_key, max_length=40, unique=True),
        ),
    ]