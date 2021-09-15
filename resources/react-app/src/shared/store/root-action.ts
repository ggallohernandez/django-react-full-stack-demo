import loginUserAction from '../../features/Users/actions/loginUserAction';
import referralLinksAction from '../../features/ReferralLinks/actions/referralLinkAction';
import requestActions from '../../shared/actions/requestsActions';

type actions =
    | loginUserAction
    | referralLinksAction
    | requestActions
;

export default actions;
