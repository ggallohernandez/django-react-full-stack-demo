import { ActionType, createReducer } from "typesafe-actions";

import * as requestsActions from "../../shared/actions/requestsActions";
import { LoadingStatusEnum } from "../../shared/constants";

type Requests = {
    [key: string]: {
        loadingStatus: LoadingStatusEnum;
    };
};

export const requestsReducer = createReducer<Requests, ActionType<typeof requestsActions>>(
    {},
).handleAction(requestsActions.setRequestInProcess, (state, { payload }) => ({
    ...state,
    [payload.requestName]: {
        loadingStatus: payload.loadingStatus,
    },
}));
