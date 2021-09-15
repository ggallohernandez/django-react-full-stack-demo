import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {
    getReferralLinkAction, incrementReferralLinkClicksAction,
} from "../../../features/ReferralLinks/actions/referralLinkAction";
import {useDispatch, useSelector} from "react-redux";
import {selectReferralLink} from "../../../shared/selectors/referralLinksSelector";
import {State} from "../../../shared/types/State";
import {selectRequestsLoadingStatus} from "../../../shared/selectors/requestsSelector";
import {GET_REFERRAL_LINK_REQUEST, GET_REFERRAL_LINKS_REQUEST, LoadingStatusEnum} from "../../../shared/constants";
import {Skeletons} from "../../../shared/components/Skeletons/Skeletons";
import {useParams} from "react-router";

export default () => {
    const dispatch = useDispatch();

    const { linkId } = useParams<{ linkId: string }>();

    dispatch(incrementReferralLinkClicksAction.request({ id: parseInt(linkId) }))

    const referralLink = useSelector(selectReferralLink);

    const getReferralLinkStatus = useSelector((state: State) =>
        selectRequestsLoadingStatus(state, GET_REFERRAL_LINK_REQUEST),
    );

    useEffect(() => {
        dispatch(getReferralLinkAction.request({ id: parseInt(linkId) }));
    }, [dispatch, linkId]);

    return (
        <>
            {getReferralLinkStatus === LoadingStatusEnum.LOADING && (
                <div className="pt-6 pl-4 pr-4">
                    <Skeletons rows={6} mb={6} />
                </div>
            )}
            {getReferralLinkStatus === LoadingStatusEnum.LOADED && (
                <Container className={"text-center pt-3"}>
                    <Row>
                        <Col sm={12}>
                            <h1>{referralLink.title} are awsome!</h1>
                        </Col>
                    </Row>
                    <Row className={"pt-3"}>
                        <Col sm={12}>
                            <h3>Come join Tim's World Wide Web!</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <img src={'/assets/img/getambassador_logo.jpg'} className={"img-fluid w-25"} />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}