import { map } from "rxjs/operators";
import {del$, get$, patch$, post$, put$} from "../../../shared/services/restApi/restApi";
import {
    AddReferralLinkParams,
    GetReferralLinkParams,
    DeleteReferralLinkParams,
    EditReferralLinkParams, GetReferralLinkByTitleParams, ReferralLinkList
} from "../../../features/ReferralLinks/types/ReferralLink";

export const baseUrl = "/api/v1";

export const getReferralLinks = () =>
    get$(
        `${baseUrl}/referral-links/`,
        {},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
        ).pipe(map((response: any) => response))
;

export const getReferralLinkByTitle = (params: GetReferralLinkByTitleParams) =>
    get$(
        `${baseUrl}/referral-links/`,
        {title: params.title},
        localStorage.getItem('id_token') != "" ? {'Authorization': 'Token ' + localStorage.getItem('id_token')} : {}
        ).pipe(map((response: any) => response.count > 0 ? response.results[0] : null))
;

export const getReferralLink = (params: GetReferralLinkParams) =>
    get$(
        `${baseUrl}/referral-links/${params.id}/`,
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
    put$(
        `${baseUrl}/referral-links/increment/${params.id}/`,
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

