import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

export type AddReferralLinkProps = {
    onSubmit: (link: string) => void;
};

export default ({ onSubmit }: AddReferralLinkProps) => {

    const title = useState("");

    const handleLinkChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleAddLink = useCallback(() => {
        onSubmit(title);
    }, [
        title,
    ]);

    return (
        <div className="d-flex align-items-stretch">
            <div className="flex-grow-1 d-flex flex-column min-vh-100">
                <div className="d-flex pl-3 pr-3 justify-content-center">
                    <div className="bg-gray-200 flex-grow-1">
                        <div className="d-flex pl-3 pr-3 justify-content-center">
                            <Row>
                                <h3></h3>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}