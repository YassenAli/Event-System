# Generated by Django 5.0.7 on 2024-08-16 15:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0015_delete_customtoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_bookings', to='events.event'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_bookings', to=settings.AUTH_USER_MODEL),
        ),
    ]
