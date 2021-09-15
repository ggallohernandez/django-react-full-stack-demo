import {ReferralLink, ReferralLinkList} from "../../features/ReferralLinks/types/ReferralLink";
import {ActionType, createReducer} from "typesafe-actions";
import {
    getReferralLinkAction, getReferralLinkByTitleAction,
    getReferralLinkListAction
} from "../../features/ReferralLinks/actions/referralLinkAction";

export const referralLinksInitState: ReferralLinkList = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

export const referralLinkInitState: ReferralLink = {
    id: 0,
    clicks: 0,
    title: "",
    link: "",
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

export const referralLinkReducer = createReducer<ReferralLink, | ActionType<typeof getReferralLinkAction> | ActionType<typeof getReferralLinkByTitleAction>>(
    referralLinkInitState,
)
    .handleAction(getReferralLinkAction.success, (state, { payload }) => ({
        ...state,
        id: payload.id,
        title: payload.title,
        clicks: payload.clicks,
        link: payload.link,
    }))
    .handleAction([getReferralLinkAction.request, getReferralLinkAction.failure], () => referralLinkInitState)
    .handleAction(getReferralLinkByTitleAction.success, (state, { payload }) => ({
        ...state,
        id: payload.id,
        title: payload.title,
        clicks: payload.clicks,
        link: payload.link,
    }))
    .handleAction([getReferralLinkByTitleAction.request, getReferralLinkByTitleAction.failure], () => referralLinkInitState);