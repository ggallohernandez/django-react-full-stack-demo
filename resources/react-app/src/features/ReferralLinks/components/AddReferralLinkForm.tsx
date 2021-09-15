import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

export type AddReferralLinkProps = {
    onSubmit: (link: string) => void;
};

export default ({ onSubmit }: AddReferralLinkProps) => {

    const [title, setTitle] = useState("");

    const handleLinkChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleAddLink = useCallback(() => {
        onSubmit(title);
    }, [
        title,
    ]);

    return (
        <div className="d-flex pl-3 pr-3 justify-content-center">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add a link</Form.Label>
                    <Form.Control type="text" value={title} onChange={handleLinkChange} placeholder="Title"/>
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleAddLink}>
                    Add
                </Button>
            </Form>
        </div>
    );
}