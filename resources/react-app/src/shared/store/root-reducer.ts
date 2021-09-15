import { combineReducers } from "redux";
import {userReducer} from "../reducers/userReducer";
import {requestsReducer} from "../../shared/reducers/requestsReducer";
import {referralLinksReducer, referralLinkReducer} from "../../shared/reducers/referralLinksReducer";

const rootReducer = combineReducers({
    user: userReducer,
    referralLinks: referralLinksReducer,
    referralLink: referralLinkReducer,
    requests: requestsReducer,
});

export default rootReducer;