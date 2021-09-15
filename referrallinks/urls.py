from django.urls import include, path
from referrallinks import views

urlpatterns = [
    path("", views.ListReferralLinksView.as_view(), name="referrallinks_list"),
    path("create/", views.CreateReferralLinkView.as_view(), name="referrallink_create"),
    path("<int:pk>/", views.RetrieveReferralLinkView.as_view(), name="referrallink_get"),
    path("by-title/<str:title>/", views.RetrieveReferralLinkByTitleView.as_view(), name="referrallink_get"),
    path("edit/<int:pk>/", views.UpdateReferralLinkView.as_view(), name="referrallink_edit"),
    path("increment/<int:pk>/", views.IncrementReferralLinkClicksView.as_view(), name="referrallink_increment_clicks"),
    path("delete/<int:pk>/", views.DeleteReferralLinkView.as_view(), name="referrallink_delete"),
]