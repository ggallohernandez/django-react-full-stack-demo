import React from "react";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";

export type HeaderProps = {
    pageTitle: string;
    isAuthenticated: boolean;
    onLogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
    username: string;
};

export const Header = ({ pageTitle, isAuthenticated, onLogOut, username }: HeaderProps) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">{pageTitle}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {
                        isAuthenticated ?
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/referral-links">Referral Links</Nav.Link>
                                    <NavDropdown title={username} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={onLogOut}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        : <></>
                    }
                </Container>
            </Navbar>
        </>
    );
};
