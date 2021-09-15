import {combineEpics, Epic, ofType} from "redux-observable";
import { merge, of } from "rxjs";
import { mergeMap, filter, catchError } from "rxjs/operators";
import {ActionType, isActionOf} from "typesafe-actions";
import {State} from "../../../shared/types/State";
import * as requestsActions from "../../../shared/actions/requestsActions";
import {
    ADD_REFERRAL_LINK_REQUEST, DELETE_REFERRAL_LINK_REQUEST, EDIT_REFERRAL_LINK_REQUEST,
    GET_REFERRAL_LINKS_REQUEST,
    LoadingStatusEnum,
} from "../../../shared/constants";
import {errorHandler} from "../../../shared/helpers/errorHandler";
import {
    addReferralLinkAction,
    deleteReferralLinkAction,
    editReferralLinkAction,
    getReferralLinkListAction
} from "../actions/referralLinkAction";
import {
    addReferralLink, deleteReferralLink,
    editReferralLink,
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
    addReferralLinkEpic,
    editReferralLinkEpic,
    deleteReferralLinkEpic,
);