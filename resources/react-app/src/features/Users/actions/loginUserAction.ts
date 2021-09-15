import {User, UserLoginParams, UserLogoutParams, UserLogoutResponse} from "../types/User";
import {ActionType, createAsyncAction} from "typesafe-actions";
import {combineActions} from "redux-actions";

export const loginUserAction = createAsyncAction(
    "LOGIN_USER_REQUEST",
    "LOGIN_USER_SUCCESS",
    "LOGIN_USER_ERROR",
)<UserLoginParams, User, undefined>();

export const logoutUserAction = createAsyncAction(
    "LOGOUT_USER_REQUEST",
    "LOGOUT_USER_SUCCESS",
    "LOGOUT_USER_ERROR",
)<UserLogoutParams, User, undefined>();

type actions =
    | ActionType<typeof loginUserAction>
    | ActionType<typeof logoutUserAction>;

export default actions;
