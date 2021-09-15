import { combineReducers } from "redux";
import { ActionType, createReducer } from "typesafe-actions";
import {loginUserAction, logoutUserAction} from "../../features/Users/actions/loginUserAction";
import {User, UserLogoutResponse} from "../../features/Users/types/User";

export const userInitState: User = {
    email: "",
    token: "",
}

type RootActions =
    | ActionType<typeof loginUserAction>
    | ActionType<typeof logoutUserAction>;

const loginReducer = createReducer<User, RootActions>(userInitState)
    .handleAction(loginUserAction.success, (state, { payload }) => ({
        ...state,
        email: payload.email,
        token: payload.token,
    }))
    .handleAction([loginUserAction.request, loginUserAction.failure, logoutUserAction.request, logoutUserAction.failure], () => userInitState);

export const userReducer = loginReducer;