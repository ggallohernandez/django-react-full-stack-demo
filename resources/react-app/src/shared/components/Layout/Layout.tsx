import React, { useCallback, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Nav, Navbar} from "react-bootstrap";

import {selectEmail, selectIsAuthenticated, selectToken} from "../../selectors/commonSelectors";
import { Header } from "../Header/Header";
import {logoutUserAction} from "../../../features/Users/actions/loginUserAction";
import LoginUserPage from "../../../features/Users/components/LoginUserPage";

export type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const email = useSelector(selectEmail);
    const token = useSelector(selectToken);

    const handleLogOut = useCallback(() => {
        dispatch(logoutUserAction.request({
            token
        }));
    }, [
        dispatch,
        token,
    ]);

    return (
        <div className="d-flex align-items-stretch">
            <div className="flex-grow-1 d-flex flex-column min-vh-100">
                <Header
                    pageTitle="The Ambassador Engineering Challenge"
                    isAuthenticated={isAuthenticated}
                    username={email}
                    onLogOut={handleLogOut}
                />
                <div className="bg-gray-200 flex-grow-1">
                    { isAuthenticated && (children) }
                    { !isAuthenticated && (<LoginUserPage/>) }
                </div>
            </div>
        </div>
    );
};
