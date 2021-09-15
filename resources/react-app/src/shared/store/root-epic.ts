import { combineEpics } from "redux-observable";
import usersEpic from "../../features/Users/epics/loginUserEpics";
import referralLinksEpic from "../../features/ReferralLinks/epics/referralLinkEpics";

export default combineEpics(
    usersEpic,
    referralLinksEpic
);