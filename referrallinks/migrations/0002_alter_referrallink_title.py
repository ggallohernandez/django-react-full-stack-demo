# Generated by Django 3.2.7 on 2021-09-15 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referrallinks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='referrallink',
            name='title',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
