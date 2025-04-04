# Generated by Django 4.2.18 on 2025-02-02 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GroupPortfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(blank=True, max_length=100, null=True)),
                ('group_email', models.EmailField(blank=True, default='', max_length=254, null=True)),
                ('group_phone', models.CharField(blank=True, max_length=100, null=True)),
                ('group_address', models.CharField(blank=True, max_length=100, null=True)),
                ('group_vat', models.CharField(blank=True, max_length=100, null=True)),
                ('group_contact_person', models.CharField(blank=True, max_length=100, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
