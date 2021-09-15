import React, {useState, useCallback, ChangeEvent} from "react";
import cx from "classnames";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {loginUserAction} from "../../Users/actions/loginUserAction";

export default () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(loginUserAction.request({
            email,
            password
        }));
    }, [
        dispatch,
        email,
        password
    ]);

    return (
        <div className="pl-3 pt-3 pr-3">
            <div className="bg-white h-100">
                <div className="pt-3">
                    <div className="d-flex pl-3 pr-3 justify-content-center">
                        <div className="w180 mr-2">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="Email"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={handleSubmit}>
                                    Log In
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};