import {State} from "../../shared/types/State";

export const selectReferralLinkList = (state: State) => state.referralLinks
export const selectReferralLink = (state: State) => state.referralLink
export const selectReferralLinks = (state: State) => selectReferralLinkList(state).results;
