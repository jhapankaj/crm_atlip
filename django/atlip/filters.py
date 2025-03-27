import django_filters
from .models import GroupPortfolio , BrandPortfolio, OwnerPortfolio , AgentPortfolio , ModelPortfolio , PatentPortfolio, DomainPortfolio
from django import forms
from django.forms.widgets import DateInput

class GroupPortfolioFilter(django_filters.FilterSet):
    group_name = django_filters.CharFilter(lookup_expr='icontains')  # Case-insensitive search
    group_email = django_filters.CharFilter(lookup_expr='icontains')
    group_phone = django_filters.CharFilter(lookup_expr='icontains')
    group_address = django_filters.CharFilter(lookup_expr='icontains')
    group_vat = django_filters.CharFilter(lookup_expr='icontains')
    group_contact_person = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = GroupPortfolio
        fields = ['group_name', 'group_email', 'group_phone', 'group_address', 'group_vat', 'group_contact_person']

class OwnerPortfolioFilter(django_filters.FilterSet):
    owner_name = django_filters.CharFilter(lookup_expr='icontains')  # Case-insensitive search
    owner_email = django_filters.CharFilter(lookup_expr='icontains')
    owner_phone = django_filters.CharFilter(lookup_expr='icontains')
    owner_address = django_filters.CharFilter(lookup_expr='icontains')
    owner_vat = django_filters.CharFilter(lookup_expr='icontains')
    owner_contact_person = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = OwnerPortfolio
        fields = ['owner_name', 'owner_email', 'owner_phone', 'owner_address', 'owner_vat', 'owner_contact_person']

class AgentPortfolioFilter(django_filters.FilterSet):
    agent_name = django_filters.CharFilter(lookup_expr='icontains')  # Case-insensitive search
    agent_email = django_filters.CharFilter(lookup_expr='icontains')
    agent_phone = django_filters.CharFilter(lookup_expr='icontains')
    agent_address = django_filters.CharFilter(lookup_expr='icontains')
    agent_vat = django_filters.CharFilter(lookup_expr='icontains')
    agent_contact_person = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = AgentPortfolio
        fields = ['agent_name', 'agent_email', 'agent_phone', 'agent_address', 'agent_vat', 'agent_contact_person']



class BrandPortfolioFilter(django_filters.FilterSet):
    def __init__(self, *args, **kwargs):
        request = kwargs.pop("request", None)
        super().__init__(*args, **kwargs)
        if request and hasattr(request.user, "territory"):
            self.filters["territory"].queryset = request.user.territory.all()

    title = django_filters.CharFilter(label="Title", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "btit_list"}))
    territory = django_filters.CharFilter(label="Territory", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bter_list"}))
    b_Type = django_filters.CharFilter(label="Type", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "btyp_list"}))
    status = django_filters.CharFilter(label="Status", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bsta_list"}))
    owner_name = django_filters.CharFilter(label="Owner Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bown_list"}))
    agent_name = django_filters.CharFilter(label="Agent Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bagt_list"}))
    group_name = django_filters.CharFilter(label="Group Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bgrp_list"}))

    deadline = django_filters.DateFilter(field_name="deadline", lookup_expr="lt", widget=DateInput(
        attrs={"id": "datepicker", "type": "date", "placeholder": "DD-MM-YYYY"}
    ))
    affidavit = django_filters.DateFilter(field_name="affidavit", lookup_expr="lt", widget=DateInput(
        attrs={"id": "datepicker", "type": "date", "placeholder": "DD-MM-YYYY"}
    ))

    class Meta:
        model = BrandPortfolio
        fields = ["title", "b_Type", "status", "owner_name", "agent_name", "group_name", "deadline", "affidavit" ]



class DomainPortfolioFilter(django_filters.FilterSet):
    def __init__(self, *args, **kwargs):
        request = kwargs.pop("request", None)
        super().__init__(*args, **kwargs)
        if request and hasattr(request.user, "territory"):
            self.filters["territory"].queryset = request.user.territory.all()

    domain_name = django_filters.CharFilter(label="Domain Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "btit_list"}))
    extension = django_filters.CharFilter(label="Extension", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bter_list"}))
    status = django_filters.CharFilter(label="Status", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bsta_list"}))
    owner_name = django_filters.CharFilter(label="Owner Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bown_list"}))
    agent_name = django_filters.CharFilter(label="Agent Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bagt_list"}))
    group_name = django_filters.CharFilter(label="Group Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bgrp_list"}))

    deadline = django_filters.DateFilter(field_name="deadline", lookup_expr="lt", widget=DateInput(
        attrs={"id": "datepicker", "type": "date", "placeholder": "DD-MM-YYYY"}
    ))
    
    class Meta:
        model = DomainPortfolio
        fields = ["domain_name", "extension", "status", "owner_name", "agent_name", "group_name", "deadline" ]


class ModelPortfolioFilter(django_filters.FilterSet):
    def __init__(self, *args, **kwargs):
        request = kwargs.pop("request", None)
        super().__init__(*args, **kwargs)
        if request and hasattr(request.user, "territory"):
            self.filters["territory"].queryset = request.user.territory.all()

    design_title = django_filters.CharFilter(label="Design Title", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "btit_list"}))
    territory = django_filters.CharFilter(label="Territory", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bter_list"}))
    d_Type = django_filters.CharFilter(label="Type", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "btyp_list"}))
    status = django_filters.CharFilter(label="Status", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bsta_list"}))
    owner_name = django_filters.CharFilter(label="Owner Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bown_list"}))
    agent_name = django_filters.CharFilter(label="Agent Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bagt_list"}))
    group_name = django_filters.CharFilter(label="Group Name", lookup_expr="icontains", widget=forms.TextInput(attrs={"list": "bgrp_list"}))

    deadline = django_filters.DateFilter(field_name="deadline", lookup_expr="lt", widget=DateInput(
        attrs={"id": "datepicker", "type": "date", "placeholder": "DD-MM-YYYY"}
    ))
    
    class Meta:
        model = ModelPortfolio
        fields = [ 
            "design_title" , "territory" , "d_Type", "status", "owner_name" , "agent_name", "group_name" , "deadline"
        ]


class PatentPortfolioFilter(django_filters.FilterSet):
    def PatentPortfolio(request):
        if request is None:
            return PatentPortfolio.objects.none()

        company = request.user.territory
        return company.terrotory.all()

    #next_annuity = django_filters.DateFilter()
    patent_title = django_filters.CharFilter(label='Patent Title', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "pate_list"}))
    territory = django_filters.CharFilter(label='Territory', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "teri_list"}))
    p_type = django_filters.CharFilter(label='Type', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "type_list"}))
    status = django_filters.CharFilter(label='Status', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "psta_list"}))
    owner_name = django_filters.CharFilter(label='Owner Name', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "own_list"}))
    agent_name = django_filters.CharFilter(label='Agent Name', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "agt_list"}))
    group_name = django_filters.CharFilter(label='Group Name', lookup_expr='icontains', widget = forms.TextInput(attrs = {"list": "grp_list"}))
    next_annuity = django_filters.DateFilter( label = "Next Annuity", field_name = 'next_annuity',  lookup_expr='lt', widget = DateInput(
        attrs = {
          "id": 'datepicker',
            "type":"date",
            "placeholder": "DD-MM-YYYY"
        }
    ))

    class Meta:
        model = PatentPortfolio
        #fields = { 'patent_title' :[ 'contains'] , 'territory' : ['exact'] ,'next_annuity': [ 'year__gt'], }
        fields = ['patent_title', 'territory', 'p_type','owner_name', 'agent_name','group_name', 'next_annuity', 'status']
        exclude =['territory']




