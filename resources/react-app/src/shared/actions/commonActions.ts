import { createAction, createAsyncAction } from "typesafe-actions";
import {CommonProps} from "../types/Common";

export const getCommonAction = createAsyncAction(
    "GET_COMMON_REQUEST",
    "GET_COMMON_SUCCESS",
    "GET_COMMON_ERROR",
)<undefined, CommonProps, undefined>();
