import React, {ChangeEvent, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../shared/types/State";
import {selectRequestsIsLoading, selectRequestsLoadingStatus} from "../../../shared/selectors/requestsSelector";
import {GET_REFERRAL_LINKS_REQUEST, LoadingStatusEnum} from "../../../shared/constants";
import {Skeletons} from "../../../shared/components/Skeletons/Skeletons";
import {selectReferralLinks} from "../../../shared/selectors/referralLinksSelector";
import {ReferralLink} from "../../../features/ReferralLinks/types/ReferralLink";
import {
    deleteReferralLinkAction,
    getReferralLinkListAction
} from "../../../features/ReferralLinks/actions/referralLinkAction";

export default () => {
    const dispatch = useDispatch();

    const getReferralLinksStatus = useSelector((state: State) =>
        selectRequestsLoadingStatus(state, GET_REFERRAL_LINKS_REQUEST),
    );

    const referralLinks = useSelector(selectReferralLinks);

    const stopPropagation = useCallback((event) => {
        event.stopPropagation();
    }, []);

    const handleDelete = useCallback((event, referralLinkId: number) => {
        event.stopPropagation();

        dispatch(deleteReferralLinkAction.request({id: referralLinkId}));
    }, [dispatch]);

    return (
        <div className="d-flex pl-3 pr-3 justify-content-center">
            {getReferralLinksStatus === LoadingStatusEnum.LOADING && (
                <div className="pt-6 pl-4 pr-4">
                    <Skeletons rows={6} mb={6} />
                </div>
            )}
            {getReferralLinksStatus === LoadingStatusEnum.LOADED && (
                <table className="mt-3 ">
                    <thead>
                        <tr className="border-bottom">
                            <th className="p-3 pr-0 label-md text-gray-500 font-weight-normal text-uppercase">
                                Link title
                            </th>
                            <th className="p-3 pr-0 label-md text-gray-500 font-weight-normal text-uppercase">
                                Clicks
                            </th>
                            <th className="p-3 pr-0 label-md text-gray-500 font-weight-normal text-uppercase">
                                Edit
                            </th>
                            <th className="p-3 pr-0 label-md text-gray-500 font-weight-normal text-uppercase">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {referralLinks.map((referralLink: ReferralLink, index: number) => (
                            <tr className="border-bottom" key={index}>
                                <td className="px-2 py-2">
                                    <a
                                        href={`${referralLink.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={stopPropagation}
                                    >
                                        {referralLink.title}
                                    </a>
                                </td>
                                <td className="px-2 py-2">{referralLink.clicks}</td>
                                <td className="px-2 py-2">
                                    <a
                                        href={`/referral-link/${referralLink.id}/edit`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={stopPropagation}
                                    >
                                        Edit
                                    </a>
                                </td>
                                <td className="px-2 py-2">
                                    <a
                                        onClick={(e) => handleDelete(e, referralLink.id)}
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}