import { LoadingStatusEnum } from "../../shared/constants";
import { State } from "../../shared/types/State";

export const selectRequestsLoadingStatus = (state: State, requestType: string) =>
    state.requests[requestType]
        ? state.requests[requestType].loadingStatus
        : LoadingStatusEnum.INITIAL;

export const selectRequestsIsLoading = (state: State, requestType: string) =>
    selectRequestsLoadingStatus(state, requestType) === LoadingStatusEnum.LOADING

export const selectRequestsIsLoaded = (state: State, requestType: string) =>
    selectRequestsLoadingStatus(state, requestType) === LoadingStatusEnum.LOADED