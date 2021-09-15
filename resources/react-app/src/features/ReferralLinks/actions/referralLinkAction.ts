import {ActionType, createAsyncAction} from "typesafe-actions";
import {
  AddReferralLinkParams,
  DeleteReferralLinkParams,
  EditReferralLinkParams,
  ReferralLink,
  ReferralLinkList
} from "../types/ReferralLink";
import {loginUserAction, logoutUserAction} from "@/src/features/Users/actions/loginUserAction";

export const addReferralLinkAction = createAsyncAction(
    "ADD_REFERRAL_LINK_REQUEST",
    "ADD_REFERRAL_LINK_SUCCESS",
    "ADD_REFERRAL_LINK_ERROR",
)<AddReferralLinkParams, ReferralLink, undefined>();

export const editReferralLinkAction = createAsyncAction(
    "EDIT_REFERRAL_LINK_REQUEST",
    "EDIT_REFERRAL_LINK_SUCCESS",
    "EDIT_REFERRAL_LINK_ERROR",
)<EditReferralLinkParams, ReferralLink, undefined>();

export const deleteReferralLinkAction = createAsyncAction(
    "DELETE_REFERRAL_LINK_REQUEST",
    "DELETE_REFERRAL_LINK_SUCCESS",
    "DELETE_REFERRAL_LINK_ERROR",
)<DeleteReferralLinkParams, undefined, undefined>();

export const getReferralLinkListAction = createAsyncAction(
    "GET_REFERRAL_LINKS_REQUEST",
    "GET_REFERRAL_LINKS_SUCCESS",
    "GET_REFERRAL_LINKS_ERROR",
)<undefined, ReferralLinkList, undefined>();

type actions =
    | ActionType<typeof addReferralLinkAction>
    | ActionType<typeof getReferralLinkListAction>
    | ActionType<typeof addReferralLinkAction>
    | ActionType<typeof deleteReferralLinkAction>;

export default actions;