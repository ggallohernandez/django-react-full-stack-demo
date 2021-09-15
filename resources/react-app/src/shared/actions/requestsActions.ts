import {ActionType, createAction} from "typesafe-actions";
import { LoadingStatusEnum } from "../constants";

export const setRequestInProcess = createAction("REQUEST_IN_PROCESS_START")<{
    requestName: string;
    loadingStatus: LoadingStatusEnum;
}>();

type actions =
    | ActionType<typeof setRequestInProcess>;

export default actions;