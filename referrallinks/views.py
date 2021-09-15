from django.dispatch import receiver
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAdminUser

from referrallinks.models import ReferralLink
from referrallinks.serializers import ReferralLinkSerializer
import bleach
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models.signals import post_save


class ListReferralLinksView(ListAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title']


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


class IncrementReferralLinkClicksView(UpdateAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]

    @receiver(post_save, sender=ReferralLink, dispatch_uid="increment_referral_link_clicks_count")
    def increment_clicks(sender, instance, **kwargs):
        instance.clicks += 1
        instance.save()


class DeleteReferralLinkView(DestroyAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]


class RetrieveReferralLinkView(RetrieveAPIView):
    queryset = ReferralLink.objects.all()
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]


class RetrieveReferralLinkByTitleView(RetrieveAPIView):
    serializer_class = ReferralLinkSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        title = self.kwargs.get('title', None)
        return ReferralLink.objects.filter(referral__title=title)
