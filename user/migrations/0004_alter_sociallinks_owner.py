# Generated by Django 4.2.2 on 2023-07-12 09:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_remove_sociallinks_profile_sociallinks_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sociallinks',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='social_links', to=settings.AUTH_USER_MODEL),
        ),
    ]
