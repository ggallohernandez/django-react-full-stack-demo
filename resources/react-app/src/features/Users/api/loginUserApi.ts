import { map } from "rxjs/operators";
import {User, UserLoginParams, UserLogoutParams} from "../types/User";
import {get$, post$} from "../../../shared/services/restApi/restApi";
import {useSelector} from "react-redux";

export const baseUrl = "/api/v1";

export const loginUser = (params: UserLoginParams) =>
    post$<{ key: string; }>(`${baseUrl}/users/login/`, {
        ...params,
    }).pipe(map((response: { key: string; }) => {
        localStorage.setItem('id_token', response.key);

        return { token: response.key, email: params.email };
    }))
;

export const logoutUser = (params: UserLogoutParams) =>
    post$<{ detail: string }>(
        `${baseUrl}/users/logout/`,
        {},
        {},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
    ).pipe(map((response: { detail: string }) => {
        localStorage.removeItem('id_token');
        return {token: "", email: ""};
    }))
;
