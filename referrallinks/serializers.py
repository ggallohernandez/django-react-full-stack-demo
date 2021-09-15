from rest_framework import serializers
from .models import ReferralLink
from rest_framework.settings import api_settings


class ReferralLinkSerializer(serializers.ModelSerializer):
    link = serializers.SerializerMethodField(method_name='calculate_link')

    class Meta:
        model = ReferralLink
        fields = ('id', 'title', 'clicks', 'link')

    def calculate_link(self, instance):
        request = self.context.get('request')
        user = request.user

        if user.is_authenticated and user.is_staff:
            #return api_settings.REFERRAL_LINK_PATTERN.format(instance.title)
            return "/landing/?link={}".format(instance.title)
