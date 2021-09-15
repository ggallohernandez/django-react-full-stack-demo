import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Row} from "react-bootstrap";
import {addReferralLinkAction, getReferralLinkListAction} from "../actions/referralLinkAction";
import AddReferralLinkForm from "./AddReferralLinkForm";
import ReferralLinkList from "./ReferralLinkList";

export default () => {
    const dispatch = useDispatch();

    const handleAddLink = (title: string) => {
        dispatch(addReferralLinkAction.request({
            title,
        }));

    };

    useEffect(() => {
        dispatch(getReferralLinkListAction.request());
    }, [dispatch]);

    return (
        <div className="pl-3 pt-3 pr-3">
            <div className="bg-white h-100">
                <div className="pt-3">
                    <Row>
                        <div className="d-flex pl-3 pr-3 justify-content-center">
                            <h3>Grow the web with referrals!</h3>
                        </div>
                    </Row>
                    <Row>
                        <AddReferralLinkForm onSubmit={handleAddLink} />
                    </Row>
                    <Row>
                        <ReferralLinkList />
                    </Row>
                </div>
            </div>
        </div>
    );
}