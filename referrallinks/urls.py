from django.urls import include, path
from referrallinks import views

urlpatterns = [
    path("", views.ListReferralLinksView.as_view(), name="referrallinks_list"),
    path("create/", views.CreateReferralLinkView.as_view(), name="referrallink_create"),
    path("edit/<int:pk>/", views.UpdateReferralLinkView.as_view(), name="referrallink_edit"),
    path("delete/<int:pk>/", views.DeleteReferralLinkView.as_view(), name="referrallink_delete"),
]