import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import qs from "qs";
import {useLocation} from "react-router";
import {
    getReferralLinkAction,
    getReferralLinkByTitleAction, incrementReferralLinkClicksAction
} from "../../../features/ReferralLinks/actions/referralLinkAction";
import {selectReferralLink} from "../../../shared/selectors/referralLinksSelector";

export default () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const referralLink = useSelector(selectReferralLink);

    const title = `${qs.parse(location.search, { ignoreQueryPrefix: true }).link}`;

    useEffect(() => {
        dispatch(getReferralLinkByTitleAction.request({ title }));
    }, [dispatch, title]);

    useEffect(() => {
        if (referralLink.id != 0)
            dispatch(incrementReferralLinkClicksAction.request({id: referralLink.id, title: referralLink.title}));
    }, [referralLink]);


    return (
        <Container className={"text-center pt-3"}>
            <Row>
                <Col sm={12}>
                    <h1>{title} are awsome!</h1>
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
    );
}