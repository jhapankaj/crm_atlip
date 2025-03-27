# Generated by Django 4.2.18 on 2025-03-06 00:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('atlip', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PatentPortfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patent_title', models.CharField(max_length=3000)),
                ('territory', models.CharField(blank=True, default='', max_length=200, null=True, verbose_name='Territory')),
                ('p_type', models.CharField(blank=True, default='', max_length=200, null=True, verbose_name='Type')),
                ('priority', models.CharField(blank=True, default='', max_length=200, null=True, verbose_name='Priority')),
                ('application_date', models.DateField(blank=True, null=True, verbose_name='Application Date')),
                ('application_no', models.CharField(blank=True, default='', max_length=200, null=True, verbose_name='Application Number')),
                ('publication_date', models.DateField(blank=True, null=True, verbose_name='Publication Date')),
                ('publication_no', models.CharField(blank=True, default='', max_length=200, null=True, verbose_name='Publication Number')),
                ('registration_date', models.DateField(blank=True, null=True, verbose_name='Registration Date')),
                ('registration_no', models.CharField(blank=True, default='', max_length=200, null=True, verbose_name='Registration Number')),
                ('next_annuity', models.DateField(blank=True, null=True, verbose_name='Next Annuity(Date)')),
                ('annuity_no', models.CharField(blank=True, default='0', max_length=200, null=True, verbose_name='Annuity Number')),
                ('owner_name', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Owner Name')),
                ('owner_email', models.EmailField(blank=True, default='', max_length=254, null=True, verbose_name='Owner Email')),
                ('owner_phone', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Owner Phone')),
                ('owner_address', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Owner Address')),
                ('owner_vat', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Owner VAT')),
                ('owner_contact_person', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Owner Contact Person')),
                ('agent_name', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Agent Name')),
                ('agent_email', models.EmailField(blank=True, default='', max_length=254, null=True, verbose_name='Agent Email')),
                ('agent_phone', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Agent Phone')),
                ('agent_address', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Agent Address')),
                ('agent_vat', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Agent VAT')),
                ('agent_contact_person', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Agent Contact Person')),
                ('group_name', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Group Name')),
                ('group_email', models.EmailField(blank=True, default='', max_length=254, null=True, verbose_name='Group Email')),
                ('group_address', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Group Address')),
                ('group_phone', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Group Phone')),
                ('group_vat', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Group VAT')),
                ('group_contact_person', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Group Contact Person')),
                ('inventor', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='Inventor')),
                ('status', models.CharField(blank=True, max_length=50, null=True, verbose_name='Status')),
                ('comments', models.CharField(blank=True, default='', max_length=500, null=True, verbose_name='Comments')),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
