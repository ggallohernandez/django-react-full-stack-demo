import {ReferralLink, ReferralLinkList} from "../../features/ReferralLinks/types/ReferralLink";
import {ActionType, createReducer} from "typesafe-actions";
import {getReferralLinkListAction} from "../../features/ReferralLinks/actions/referralLinkAction";

export const referralLinksInitState: ReferralLinkList = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

export const referralLinksReducer = createReducer<ReferralLinkList, ActionType<typeof getReferralLinkListAction>>(
    referralLinksInitState,
)
    .handleAction(getReferralLinkListAction.success, (state, { payload }) => ({
        ...state,
        count: payload.count,
        next: payload.next,
        previous: payload.previous,
        results: payload.results,
    }))
    .handleAction([getReferralLinkListAction.request, getReferralLinkListAction.failure], () => referralLinksInitState);