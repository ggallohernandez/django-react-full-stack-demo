import {combineEpics, Epic, ofType} from "redux-observable";
import { merge, of } from "rxjs";
import { mergeMap, filter, catchError } from "rxjs/operators";
import {ActionType, isActionOf} from "typesafe-actions";
import {loginUserAction, logoutUserAction} from "../actions/loginUserAction";
import {State} from "../../../shared/types/State";
import * as requestsActions from "../../../shared/actions/requestsActions";
import {LoadingStatusEnum, LOGIN_USER_REQUEST, LOGOUT_USER_REQUEST} from "../../../shared/constants";
import {loginUser, logoutUser} from "../api/loginUserApi";
import {User, UserLoginParams} from "../types/User";
import {errorHandler} from "../../../shared/helpers/errorHandler";
import RootActions from "../../../shared/store/root-action";

type RootActions =
    | ActionType<typeof loginUserAction>
    | ActionType<typeof logoutUserAction>
    | ActionType<typeof requestsActions>;

const loginUsersEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(loginUserAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: LOGIN_USER_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                loginUser(action.payload).pipe(
                    mergeMap((data: User) => [
                        requestsActions.setRequestInProcess({
                            requestName: LOGIN_USER_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        loginUserAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            loginUserAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: LOGIN_USER_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

const logoutUsersEpic: Epic<RootActions, RootActions, State> = (action$) =>
    action$.pipe(
        filter(isActionOf(logoutUserAction.request)),
        mergeMap((action) =>
            merge(
                of(
                    requestsActions.setRequestInProcess({
                        requestName: LOGOUT_USER_REQUEST,
                        loadingStatus: LoadingStatusEnum.LOADING,
                    }),
                ),
                logoutUser(action.payload).pipe(
                    mergeMap((data: User) => [
                        requestsActions.setRequestInProcess({
                            requestName: LOGOUT_USER_REQUEST,
                            loadingStatus: LoadingStatusEnum.LOADED,
                        }),
                        logoutUserAction.success(data),
                    ]),
                    catchError((e) => {
                        errorHandler(e);
                        return of(
                            logoutUserAction.failure(),
                            requestsActions.setRequestInProcess({
                                requestName: LOGOUT_USER_REQUEST,
                                loadingStatus: LoadingStatusEnum.ERROR,
                            }),
                        );
                    }),
                ),
            ),
        ),
    );

export default combineEpics(
    loginUsersEpic,
    logoutUsersEpic,
);