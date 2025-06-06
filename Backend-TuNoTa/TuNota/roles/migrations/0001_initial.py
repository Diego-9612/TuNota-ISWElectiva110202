# Generated by Django 5.2 on 2025-05-15 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.CharField(max_length=36, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=36, unique=True)),
                ('route', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'roles',
            },
        ),
    ]
