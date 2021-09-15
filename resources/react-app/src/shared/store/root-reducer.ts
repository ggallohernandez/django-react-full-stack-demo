import { combineReducers } from "redux";
import {userReducer} from "../reducers/userReducer";
import {requestsReducer} from "../../shared/reducers/requestsReducer";
import {referralLinksReducer} from "../../shared/reducers/referralLinksReducer";

const rootReducer = combineReducers({
    user: userReducer,
    referralLinks: referralLinksReducer,
    requests: requestsReducer,
});

export default rootReducer;