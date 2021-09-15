import {ActionType, createAsyncAction} from "typesafe-actions";
import {
  AddReferralLinkParams,
  DeleteReferralLinkParams,
  EditReferralLinkParams, GetReferralLinkByTitleParams, GetReferralLinkParams, IncrementReferralLinkClicksParams,
  ReferralLink,
  ReferralLinkList
} from "../types/ReferralLink";

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

export const getReferralLinkAction = createAsyncAction(
    "GET_REFERRAL_LINK_REQUEST",
    "GET_REFERRAL_LINK_SUCCESS",
    "GET_REFERRAL_LINK_ERROR",
)<GetReferralLinkParams, ReferralLink, undefined>();

export const getReferralLinkByTitleAction = createAsyncAction(
    "GET_REFERRAL_LINK_BY_TITLE_REQUEST",
    "GET_REFERRAL_LINK_BY_TITLE_SUCCESS",
    "GET_REFERRAL_LINK_BY_TITLE_ERROR",
)<GetReferralLinkByTitleParams, ReferralLink, undefined>();

export const incrementReferralLinkClicksAction = createAsyncAction(
    "INCREMENT_REFERRAL_LINK_CLICKS_REQUEST",
    "INCREMENT_REFERRAL_LINK_CLICKS_SUCCESS",
    "INCREMENT_REFERRAL_LINK_CLICKS_ERROR",
)<IncrementReferralLinkClicksParams, ReferralLink, undefined>();

type actions =
    | ActionType<typeof addReferralLinkAction>
    | ActionType<typeof getReferralLinkListAction>
    | ActionType<typeof getReferralLinkAction>
    | ActionType<typeof getReferralLinkByTitleAction>
    | ActionType<typeof incrementReferralLinkClicksAction>
    | ActionType<typeof addReferralLinkAction>
    | ActionType<typeof deleteReferralLinkAction>;

export default actions;