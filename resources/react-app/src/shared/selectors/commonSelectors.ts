import {State} from "../types/State";

export const selectUser = (state: State) => state.user
export const selectIsAuthenticated = (state: State) => selectUser(state).token != ""
export const selectEmail = (state: State) => selectUser(state).email
export const selectToken = (state: State) => selectUser(state).token
