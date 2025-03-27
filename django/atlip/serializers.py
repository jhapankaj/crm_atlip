from rest_framework import serializers
from .models import GroupPortfolio , PatentPortfolio , BrandPortfolio, OwnerPortfolio, AgentPortfolio, DomainPortfolio, ModelPortfolio

class GroupPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPortfolio
        fields = '__all__'  # Include all fields, or specify the ones you need

class OwnerPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerPortfolio
        fields = '__all__'  # Include all fields, or specify the ones you need

class AgentPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentPortfolio
        fields = '__all__'  # Include all fields, or specify the ones you need


class PatentPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatentPortfolio
        fields = '__all__'  # Include all fields

class BrandPortfolioSerializer(serializers.ModelSerializer):
    # logo = serializers.ImageField(required=False)  # Ensure this is present

    class Meta:
        model = BrandPortfolio
        fields = "__all__"

class ModelPortfolioSerializer(serializers.ModelSerializer):
    # logo = serializers.ImageField(required=False)  # Ensure this is present

    class Meta:
        model = ModelPortfolio
        fields = "__all__"


class DomainPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainPortfolio
        fields = '__all__'  # Include all fields