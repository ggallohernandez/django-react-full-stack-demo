import { ajax, AjaxResponse } from "rxjs/ajax";
import { map } from "rxjs/operators";
import qs from "qs";

export const removeEmptyParams = (obj: { [key: string]: unknown }) =>
    Object.keys(obj).reduce(
        (acc, key) =>
            obj[key] !== undefined && obj[key] !== "" && obj[key] !== null
                ? { [key]: obj[key], ...acc }
                : acc,
        {},
    );

const defaultHeaders = {
    "Content-type": "application/json; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
};

const setQueryString = (params?: { [key: string]: unknown }) =>
    qs.stringify({
        camelCase: 1,
        ...(params ? removeEmptyParams(params) : undefined),
    });

export const get$ = <T = undefined>(url: string, params?: { [key: string]: unknown }, headers?: { [key: string]: unknown }) =>
    ajax({
        url: `${url}?${setQueryString(params)}`,
        method: "GET",
        headers: { ...defaultHeaders, ...headers },
    }).pipe(map((data: AjaxResponse<any>): T => data.response));

export const post$ = <T = undefined>(
    url: string,
    body?: { [key: string]: unknown } | string,
    params?: { [key: string]: unknown },
    headers?: { [key: string]: unknown },
) =>
    ajax({
        url: `${url}?${setQueryString(params)}`,
        method: "POST",
        headers: { ...defaultHeaders, ...headers },
        body,
    }).pipe(map((data: AjaxResponse<any>): T => data.response));

export const put$ = <T = undefined>(
    url: string,
    body?: { [key: string]: unknown } | string,
    params?: { [key: string]: unknown },
    headers?: { [key: string]: unknown },
) =>
    ajax({
        url: `${url}?${setQueryString(params)}`,
        method: "PUT",
        headers: { ...defaultHeaders, ...headers },
        body,
    }).pipe(map((data: AjaxResponse<any>): T => data.response));

export const del$ = <T = undefined>(
    url: string,
    body?: { [key: string]: unknown },
    params?: { [key: string]: unknown },
    headers?: { [key: string]: unknown },
) =>
    ajax({
        url: `${url}?${setQueryString(params)}`,
        method: "DELETE",
        headers: { ...defaultHeaders, ...headers },
        body,
    }).pipe(map((data: AjaxResponse<any>): T => data.response));

export const patch$ = <T = undefined>(
    url: string,
    body?: { [key: string]: unknown } | string,
    params?: { [key: string]: unknown },
    headers?: { [key: string]: unknown },
) =>
    ajax({
        url: `${url}?${setQueryString(params)}`,
        method: "PATCH",
        headers: { ...defaultHeaders, ...headers },
        body,
    }).pipe(map((data: AjaxResponse<any>): T => data.response));
