from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAdminUser

from referrallinks.models import ReferralLink
from referrallinks.serializers import ReferralLinkSerializer
import bleach



class ListReferralLinksView(ListAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]


class CreateReferralLinkView(CreateAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        replacement = bleach.clean(serializer.validated_data.get('title'), strip=True)

        serializer.save(title=replacement)


class UpdateReferralLinkView(UpdateAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):
        replacement = bleach.clean(serializer.validated_data.get('title'), strip=True)

        serializer.save(title=replacement)


class DeleteReferralLinkView(DestroyAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]
