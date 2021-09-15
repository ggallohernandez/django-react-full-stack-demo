from django.db import models


class ReferralLink(models.Model):
    title = models.CharField(max_length=255, blank=False, unique=True)
    clicks = models.PositiveIntegerField(default=0)