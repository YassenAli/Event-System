# Generated by Django 5.0.7 on 2024-07-25 20:55

import django.db.models.deletion
import django.utils.crypto
import events.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_customuser_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(default=django.utils.crypto.get_random_string, max_length=40, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expires_at', models.DateTimeField(default=events.models.get_default_expiration_date)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.customuser')),
            ],
        ),
    ]
# Generated by Django 5.0.7 on 2024-07-25 20:55

import django.db.models.deletion
import django.utils.crypto
import events.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_customuser_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(default=django.utils.crypto.get_random_string, max_length=40, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expires_at', models.DateTimeField(default=events.models.get_default_expiration_date)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.customuser')),
            ],
        ),
    ]
