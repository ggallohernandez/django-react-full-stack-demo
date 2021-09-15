import { map } from "rxjs/operators";
import {del$, get$, patch$, post$} from "../../../shared/services/restApi/restApi";
import {
    AddReferralLinkParams,
    DeleteReferralLinkParams,
    EditReferralLinkParams
} from "../../../features/ReferralLinks/types/ReferralLink";

export const baseUrl = "/api/v1";

export const getReferralLinks = () =>
    get$(
        `${baseUrl}/referral-links/`,
        {},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
        ).pipe(map((response: any) => response))
;

export const addReferralLink = (params: AddReferralLinkParams) =>
    post$(
        `${baseUrl}/referral-links/create/`,
        {
            ...params
        },
        {},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
    ).pipe(map((response: any) => response))
;

export const editReferralLink = (params: EditReferralLinkParams) =>
    patch$(
        `${baseUrl}/referral-links/edit/${params.id}/`,
        {
            ...params
        },
        {},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
    ).pipe(map((response: any) => response))
;

export const deleteReferralLink = (params: DeleteReferralLinkParams) =>
    del$(
        `${baseUrl}/referral-links/delete/${params.id}/`,
        {},
        {},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
    ).pipe(map((response: any) => response))
;

