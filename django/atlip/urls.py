from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GroupPortfolioViewSet, UploadXLSViewSet, GroupPortfolioUploadViewSet,
    PatentPortfolioViewSet, UploadPatentXLSViewSet, PatentPortfolioUploadViewSet,
    BrandPortfolioViewSet, UploadBrandXLSViewSet, BrandPortfolioUploadViewSet,
    OwnerPortfolioViewSet, UploadOwnerXLSViewSet, OwnerPortfolioUploadViewSet,
    AgentPortfolioViewSet, UploadAgentXLSViewSet, AgentPortfolioUploadViewSet,
    DomainPortfolioViewSet, UploadDomainXLSViewSet, DomainPortfolioUploadViewSet,
    ModelPortfolioViewSet , UploadModelXLSViewSet, ModelPortfolioUploadViewSet
)

app_name = 'atlip'  # Keep app namespace

# Create a router and register both GroupPortfolio and PatentPortfolio ViewSets
router = DefaultRouter()
router.register(r'group_portfolio', GroupPortfolioViewSet, basename='groupportfolio')
router.register(r'patent_portfolio', PatentPortfolioViewSet, basename='patentportfolio')
router.register(r'brand_portfolio', BrandPortfolioViewSet, basename='brandportfolio')
router.register(r'owner_portfolio', OwnerPortfolioViewSet, basename='ownerportfolio')
router.register(r'agent_portfolio', AgentPortfolioViewSet, basename='agentportfolio')
router.register(r'domain_portfolio', DomainPortfolioViewSet, basename='domainportfolio')
router.register(r'model_portfolio', ModelPortfolioViewSet, basename='modelportfolio')

urlpatterns = [
    # Include the DRF router URLs for GroupPortfolioViewSet and PatentPortfolioViewSet
    path('', include(router.urls)),

    # Custom URLs for XLS Upload and Template Download for GroupPortfolio
    path('upload-group/', UploadXLSViewSet.as_view({'post': 'create'}), name='upload-group'),
    path('download-template/', GroupPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-template'),

    # Custom URLs for XLS Upload and Template Download for OwnerPortfolio
    path('upload-owner/', UploadOwnerXLSViewSet.as_view({'post': 'create'}), name='upload-owner'),
    path('download-owner-template/', OwnerPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-owner-template'),

    # Custom URLs for XLS Upload and Template Download for AgentPortfolio
    path('upload-agent/', UploadAgentXLSViewSet.as_view({'post': 'create'}), name='upload-agent'),
    path('download-agent-template/', AgentPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-agent-template'),

    # Custom URLs for XLS Upload and Template Download for PatentPortfolio
    path('upload-patent/', UploadPatentXLSViewSet.as_view({'post': 'create'}), name='upload-patent'),
    path('download-patent-template/', PatentPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-patent-template'),

    # Custom URLs for XLS Upload and Template Download for BrandPortfolio
    path('upload-brand/', UploadBrandXLSViewSet.as_view({'post': 'create'}), name='upload-brand'),
    path('download-brand-template/', BrandPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-brand-template'),
    # path("upload-logo/", UploadLogoView.as_view(), name="upload-logo"),

    # Custom URLs for XLS Upload and Template Download for DomainPortfolio
    path('upload-domain/', UploadDomainXLSViewSet.as_view({'post': 'create'}), name='upload-domain'),
    path('download-domain-template/', DomainPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-domain-template'),
    # path("upload-logo/", UploadLogoView.as_view(), name="upload-logo"),

    # Custom URLs for XLS Upload and Template Download for ModelPortfolio
    path('upload-model/', UploadModelXLSViewSet.as_view({'post': 'create'}), name='upload-model'),
    path('download-model-template/', ModelPortfolioUploadViewSet.as_view({'get': 'download_template'}), name='download-model-template'),
    # path("upload-logo/", UploadLogoView.as_view(), name="upload-logo"),

    
]