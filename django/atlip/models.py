from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import datetime
from django.utils.translation import gettext as _


class GroupPortfolio(models.Model):
    group_name = models.CharField(max_length=100, null=True, blank=True)
    group_email = models.EmailField(null=True, blank=True, default="")
    group_phone = models.CharField(max_length=100, null=True, blank=True)
    group_address = models.CharField(max_length=100, null=True, blank=True)
    group_vat = models.CharField(max_length=100, null=True, blank=True)
    group_contact_person = models.CharField(max_length=100, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return f"{self.group_name} ({self.group_contact_person})"
    

class PatentPortfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL , null= True)
    #user = models.CharField(max_length=3000)
    patent_title = models.CharField(max_length=3000)
    territory = models.CharField(default ="" , max_length=200, null=True, blank=True , verbose_name = 'Territory')
    p_type = models.CharField(default ="" , max_length=200, null=True, blank=True , verbose_name = 'Type' )
    priority = models.CharField(default ="" , max_length=200, null=True, blank=True , verbose_name = 'Priority')
    application_date = models.DateField(_("Application Date"), null=True, blank=True , )
    application_no = models.CharField(default ="" , max_length=200, blank=True, null=True , verbose_name = 'Application Number')
    publication_date = models.DateField(_("Publication Date"), null=True, blank=True )
    publication_no = models.CharField(default ="" , max_length=200, blank=True, null=True , verbose_name= 'Publication Number')
    registration_date = models.DateField(_("Registration Date"), null=True, blank=True)
    registration_no = models.CharField(default ="" , max_length=200, null=True, blank=True , verbose_name= 'Registration Number')
    next_annuity = models.DateField(_("Next Annuity(Date)"), null=True, blank=True)
    annuity_no = models.CharField(default ="0" , max_length=200, blank=True, null=True , verbose_name = 'Annuity Number')
    owner_name = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Owner Name')
    owner_email = models.EmailField(null=True, blank=True , default ="" , verbose_name = 'Owner Email')
    owner_phone = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Owner Phone')
    owner_address = models.CharField(max_length=100, null=True, default ="" ,  blank=True , verbose_name = 'Owner Address')
    owner_vat = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name= 'Owner VAT')
    owner_contact_person = models.CharField(default ="" , max_length=100, null=True,  blank=True , verbose_name = 'Owner Contact Person')
    agent_name = models.CharField(max_length=100, null=True, default ="" , blank=True , verbose_name = 'Agent Name')
    agent_email = models.EmailField(null=True, blank=True , default ="", verbose_name= 'Agent Email')
    agent_phone = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name= 'Agent Phone')
    agent_address = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name= 'Agent Address')
    agent_vat = models.CharField(default ="", max_length=100, null=True, blank=True , verbose_name = 'Agent VAT')
    agent_contact_person = models.CharField(default ="", max_length=100, null=True, blank=True , verbose_name = 'Agent Contact Person')
    group_name = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Group Name')
    group_email = models.EmailField(null=True, blank=True, default ="" , verbose_name = 'Group Email')
    group_address = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Group Address')
    group_phone = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Group Phone')
    group_vat = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name='Group VAT')
    group_contact_person = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name='Group Contact Person')
    inventor = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Inventor' )
    status = models.CharField(max_length=50, null=True, blank=True , verbose_name = "Status")
    comments = models.CharField(default ="" , max_length=500, null=True, blank=True , verbose_name = 'Comments')
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.registration_no
    

class BrandPortfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL , null= True , related_name = "userid" )
    title = models.CharField(max_length=3000)
    #logo = models.ImageField(upload_to ='logo/%Y/%m/%d' , blank = True , verbose_name="Logo",  default="na.png")
    logo = models.ImageField(upload_to='logo', blank=True, null=True)
    b_Type = models.CharField(max_length=200, null=True, blank=True , verbose_name = "Type")
    territory = models.CharField(max_length=200, null=True, blank=True , verbose_name = "Territory")
    application_date = models.DateField(_("Application Date"), null=True, blank=True )
    application_no = models.CharField(max_length=200, blank=True, null=True , verbose_name="Application Number")
    registration_date = models.DateField(_("Registration Date") , null=True, blank=True )
    registration_no = models.CharField(max_length=200, null=True, blank=True , verbose_name="Registration Number")
    classes = models.CharField(max_length=100, null=True, blank=True , verbose_name= "Classes")
    deadline = models.DateField(_("Deadline"), null=True, blank=True )
    affidavit = models.DateField(_("Affidavit"), null=True, blank=True )
    owner_name = models.CharField(max_length=100, null=True, blank=True , verbose_name="Owner Name")
    owner_email = models.TextField(null=True, blank=True , default ="" , verbose_name="Owner Email")
    owner_phone = models.CharField(max_length=100, null=True, blank=True , verbose_name="Owner Phone")
    owner_address = models.CharField(max_length=100, null=True, blank=True , verbose_name="Owner Address")
    owner_vat = models.CharField(max_length=100, null=True, blank=True , verbose_name="Owner VAT")
    owner_contact_person = models.CharField(max_length=100, null=True, blank=True , verbose_name="Owner Contact")
    agent_name = models.CharField(max_length=3000, null=True, blank=True , verbose_name="Agent Name")
    agent_email = models.TextField(null=True, blank=True , default ="" , verbose_name="Agent Email")
    agent_phone = models.CharField(max_length=100, null=True, blank=True , verbose_name="Agent Phone")
    agent_address = models.CharField(max_length=100, null=True, blank=True , verbose_name="Agent Address")
    agent_vat = models.CharField(max_length=100, null=True, blank=True, verbose_name="Agent- VAT")
    agent_contact_person = models.CharField(max_length=100, null=True, blank=True, verbose_name="Agent Contact")
    group_name = models.CharField(max_length=100, null=True, blank=True , verbose_name = "Group Name")
    group_email = models.TextField(null=True, blank=True, default ="", verbose_name="Group Email")
    group_address = models.CharField(max_length=100, null=True, blank=True , verbose_name= "Group Address")
    group_phone = models.CharField(max_length=100, null=True, blank=True, verbose_name="Group- Phone")
    group_vat = models.CharField(max_length=100, null=True, blank=True, verbose_name="Group VAT ")
    group_contact_person = models.CharField(max_length=100, null=True, blank=True , verbose_name = "Group Contact")
    comments = models.CharField(max_length=500, null=True, blank=True , verbose_name="Comments")
    status = models.CharField(max_length=50, null=True, blank=True , verbose_name = "Status")
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return str(self.id)
    

class OwnerPortfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL , null= True)
    owner_name = models.CharField(max_length=100, null=True, blank=True)
    owner_email = models.EmailField(null=True, blank=True , default ="")
    owner_phone = models.CharField(max_length=100, null=True, blank=True)
    owner_address = models.CharField(max_length=100, null=True, blank=True)
    owner_vat = models.CharField(max_length=100, null=True, blank=True)
    owner_contact_person = models.CharField(max_length=100, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.owner_vat
    

class AgentPortfolio(models.Model):
    #agent_id= models.AutoField(primary_key=True , default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL , null= True)
    agent_name = models.CharField(max_length=100, null=True, blank=True)
    agent_email = models.EmailField(null=True, blank=True , default ="null")
    agent_phone = models.CharField(max_length=100, null=True, blank=True)
    agent_address = models.CharField(max_length=100, null=True, blank=True)
    agent_vat = models.CharField(max_length=100, null=True, blank=True)
    agent_contact_person = models.CharField(max_length=100, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.agent_name
    

class DomainPortfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL , null= True)
    domain_name = models.CharField(max_length=3000)
    extension = models.CharField(max_length=200, null=True, blank=True)
    creation_date = models.DateField(_("Creation Date"), null=True, blank=True)
    deadline = models.DateField(_("Deadline"), null=True, blank=True)
    owner_name = models.CharField(max_length=100, null=True, blank=True)
    owner_email = models.EmailField(null=True, blank=True , default ="")
    owner_phone = models.CharField(max_length=100, null=True, blank=True)
    owner_address = models.CharField(max_length=100, null=True, blank=True)
    owner_vat = models.CharField(max_length=100, null=True, blank=True)
    owner_contact_person = models.CharField(max_length=100, null=True, blank=True)
    agent_name = models.CharField(max_length=100, null=True, blank=True)
    agent_email = models.EmailField(null=True, blank=True , default ="")
    agent_phone = models.CharField(max_length=100, null=True, blank=True)
    agent_address = models.CharField(max_length=100, null=True, blank=True)
    agent_vat = models.CharField(max_length=100, null=True, blank=True)
    agent_contact_person = models.CharField(max_length=100, null=True, blank=True)
    group_name = models.CharField(max_length=100, null=True, blank=True)
    group_email = models.EmailField(null=True, blank=True, default ="")
    group_address = models.CharField(max_length=100, null=True, blank=True)
    group_phone = models.CharField(max_length=100, null=True, blank=True)
    group_vat = models.CharField(max_length=100, null=True, blank=True)
    group_contact_person = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True , verbose_name = "Status")
    comments = models.CharField(max_length=500, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    

    def __str__(self):
        return self.creation_date


#Model = Design
class ModelPortfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL , null= True)
    design_title = models.CharField(max_length=3000)
    # logo = models.ImageField(upload_to = 'logo',blank = True, default="na.png" , null=True)
    logo = models.ImageField(upload_to='logo', blank=True, null=True)
    territory = models.CharField(max_length=200, null=True, blank=True)
    d_Type = models.CharField(max_length=200, null=True, blank=True)
    application_date = models.DateField(_("Application Date"), null=True, blank=True)
    application_no = models.CharField(max_length=200, blank=True, null=True)
    registration_date = models.DateField(_("Registration Date"), null=True, blank=True)
    registration_no = models.CharField(max_length=200, null=True, blank=True)
    deadline = models.DateField(_("Deadline"), null=True, blank=True)
    owner_name = models.CharField(max_length=100, null=True, blank=True)
    owner_email = models.EmailField(null=True, blank=True , default ="")
    owner_phone = models.CharField(max_length=100, null=True, blank=True)
    owner_address = models.CharField(max_length=100, null=True, blank=True)
    owner_vat = models.CharField(max_length=100, null=True, blank=True)
    owner_contact_person = models.CharField(max_length=100, null=True, blank=True)
    agent_name = models.CharField(max_length=100, null=True, blank=True)
    agent_email = models.EmailField(null=True, blank=True , default ="")
    agent_phone = models.CharField(max_length=100, null=True, blank=True)
    agent_address = models.CharField(max_length=100, null=True, blank=True)
    agent_vat = models.CharField(max_length=100, null=True, blank=True)
    agent_contact_person = models.CharField(max_length=100, null=True, blank=True)
    group_name = models.CharField(max_length=100, null=True, blank=True)
    group_email = models.EmailField(null=True, blank=True, default ="")
    group_address = models.CharField(max_length=100, null=True, blank=True)
    group_phone = models.CharField(max_length=100, null=True, blank=True)
    group_vat = models.CharField(max_length=100, null=True, blank=True)
    group_contact_person = models.CharField(max_length=100, null=True, blank=True)
    inventor = models.CharField(default ="" , max_length=100, null=True, blank=True , verbose_name = 'Inventor' )
    comments = models.CharField(max_length=500, null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True , verbose_name = "Status")
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.registration_no
