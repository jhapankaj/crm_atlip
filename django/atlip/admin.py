from django.contrib import admin

# Register your models here.
from .models import GroupPortfolio, PatentPortfolio, BrandPortfolio, OwnerPortfolio, AgentPortfolio, ModelPortfolio, DomainPortfolio

admin.site.register(GroupPortfolio)
admin.site.register(PatentPortfolio)
admin.site.register(BrandPortfolio)
admin.site.register(OwnerPortfolio)
admin.site.register(AgentPortfolio)
admin.site.register(ModelPortfolio)
admin.site.register(DomainPortfolio)
