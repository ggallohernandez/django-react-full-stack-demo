import {combineEpics, Epic, ofType} from "redux-observable";
import { merge, of } from "rxjs";
import { mergeMap, filter, catchError } from "rxjs/operators";
import {ActionType, isActionOf} from "typesafe-actions";
import {State} from "../../../shared/types/State";
import * as requestsActions from "../../../shared/actions/requestsActions";
import {
    ADD_REFERRAL_LINK_REQUEST,
    DELETE_REFERRAL_LINK_REQUEST,
    EDIT_REFERRAL_LINK_REQUEST,
    GET_REFERRAL_LINK_BY_TITLE_REQUEST,
    GET_REFERRAL_LINK_REQUEST,
    GET_REFERRAL_LINKS_REQUEST,
    INCREMENT_REFERRAL_LINK_CLICKS_REQUEST,
    LoadingStatusEnum,
} from "../../../shared/constants";
import {errorHandler} from "../../../shared/helpers/errorHandler";
import {
    addReferralLinkAction,
    deleteReferralLinkAction,
    editReferralLinkAction,
    getReferralLinkListAction,
    getReferralLinkAction, incrementReferralLinkClicksAction, getReferralLinkByTitleAction
} from "../actions/referralLinkAction";
import {
    addReferralLink, deleteReferralLink,
    editReferralLink, getReferralLink, getReferralLinkByTitle,
    getReferralLinks
} from "../../../features/ReferralLinks/api/referralLinksApi";
import {ReferralLink, ReferralLinkList} from "../../../features/ReferralLinks/types/ReferralLink";
import RootActions from "../../../shared/store/root-action";

const getReferralLinksEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(getReferralLinkListAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: GET_REFERRAL_LINKS_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                getReferralLinks().pipe(
                    mergeMap((data: ReferralLinkList) => [
                        requestsActions.setRequestInProcess({
                            requestName: GET_REFERRAL_LINKS_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        getReferralLinkListAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            getReferralLinkListAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: GET_REFERRAL_LINKS_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

const getReferralLinkEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(getReferralLinkAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: GET_REFERRAL_LINK_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                getReferralLink(action.payload).pipe(
                    mergeMap((data: ReferralLinkList) => [
                        requestsActions.setRequestInProcess({
                            requestName: GET_REFERRAL_LINK_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        getReferralLinkAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            getReferralLinkAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: GET_REFERRAL_LINK_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

const getReferralLinkByTitleEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(getReferralLinkByTitleAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: GET_REFERRAL_LINK_BY_TITLE_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                getReferralLinkByTitle(action.payload).pipe(
                    mergeMap((data: ReferralLinkList) => [
                        requestsActions.setRequestInProcess({
                            requestName: GET_REFERRAL_LINK_BY_TITLE_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        getReferralLinkByTitleAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            getReferralLinkByTitleAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: GET_REFERRAL_LINK_BY_TITLE_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );


const addReferralLinkEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(addReferralLinkAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: ADD_REFERRAL_LINK_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                addReferralLink(action.payload).pipe(
                    mergeMap((data: ReferralLink) => [
                        requestsActions.setRequestInProcess({
                            requestName: ADD_REFERRAL_LINK_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        addReferralLinkAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            addReferralLinkAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: ADD_REFERRAL_LINK_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
                getReferralLinks().pipe(
                    mergeMap((data: ReferralLinkList) => [
                        requestsActions.setRequestInProcess({
                            requestName: GET_REFERRAL_LINKS_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        getReferralLinkListAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            getReferralLinkListAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: GET_REFERRAL_LINKS_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

const editReferralLinkEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(editReferralLinkAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: EDIT_REFERRAL_LINK_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                editReferralLink(action.payload).pipe(
                    mergeMap((data: ReferralLink) => [
                        requestsActions.setRequestInProcess({
                            requestName: EDIT_REFERRAL_LINK_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        editReferralLinkAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            editReferralLinkAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: EDIT_REFERRAL_LINK_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

const incrementReferralLinkClicksEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(incrementReferralLinkClicksAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: INCREMENT_REFERRAL_LINK_CLICKS_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                editReferralLink(action.payload).pipe(
                    mergeMap((data: ReferralLink) => [
                        requestsActions.setRequestInProcess({
                            requestName: INCREMENT_REFERRAL_LINK_CLICKS_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        incrementReferralLinkClicksAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            incrementReferralLinkClicksAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: INCREMENT_REFERRAL_LINK_CLICKS_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

const deleteReferralLinkEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(deleteReferralLinkAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: DELETE_REFERRAL_LINK_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                deleteReferralLink(action.payload).pipe(
                    mergeMap((data: ReferralLink) => [
                        requestsActions.setRequestInProcess({
                            requestName: DELETE_REFERRAL_LINK_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        deleteReferralLinkAction.success(),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            deleteReferralLinkAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: DELETE_REFERRAL_LINK_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
                getReferralLinks().pipe(
                    mergeMap((data: ReferralLinkList) => [
                        requestsActions.setRequestInProcess({
                            requestName: GET_REFERRAL_LINKS_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        getReferralLinkListAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            getReferralLinkListAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: GET_REFERRAL_LINKS_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );



export default combineEpics(
    getReferralLinksEpic,
    getReferralLinkEpic,
    getReferralLinkByTitleEpic,
    addReferralLinkEpic,
    incrementReferralLinkClicksEpic,
    editReferralLinkEpic,
    deleteReferralLinkEpic,
);