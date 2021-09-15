import { compose, PreloadedState } from "redux";

import { State } from "./State";

declare global {
    interface Window {
        __PRELOADED_STATE__: PreloadedState<State>;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
