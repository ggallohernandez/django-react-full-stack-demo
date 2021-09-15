import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    editReferralLinkAction, getReferralLinkAction,
    getReferralLinkListAction
} from "../../../features/ReferralLinks/actions/referralLinkAction";
import {useParams} from "react-router";
import {selectReferralLink} from "../../../shared/selectors/referralLinksSelector";

export default () => {
    const dispatch = useDispatch();
    const referralLink = useSelector(selectReferralLink);

    const [title, setTitle] = useState(referralLink.title);

    const { linkId } = useParams<{ linkId: string }>();

    const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    useEffect(() => {
        dispatch(getReferralLinkAction.request({
            id: parseInt(linkId)
        }));
    }, [dispatch, linkId]);

    useEffect(() => {
        setTitle(referralLink.title)
    }, [referralLink]);

    const handleSubmit = useCallback(() => {
        dispatch(editReferralLinkAction.request({
            id: referralLink.id,
            title
        }));
    }, [
        dispatch,
        referralLink,
        title,
    ]);

    return (
        <div className="d-flex pl-3 pr-3 justify-content-center">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={handleTitleChange} placeholder="Title"/>
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleSubmit}>
                    Save
                </Button>
            </Form>
        </div>
    );
}