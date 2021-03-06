import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import { PersistGate } from "redux-persist/integration/react";

import { Layout } from "./shared/components/Layout/Layout";

import './App.scss';
import LoginUserPage from "./features/Users/components/LoginUserPage";
import HomePage from "./features/Home/components/HomePage";
import store, {persistor} from "./shared/store";
import ReferralLinkPage from "./features/ReferralLinks/components/ReferralLinkPage";
import ReferralLinkLandingPage from "./features/ReferralLinks/components/ReferralLinkLandingPage";
import ReferralLinkSimpleLandingPage from "./features/ReferralLinks/components/ReferralLinkSimpleLandingPage";
import EditReferralLinkForm from "./features/ReferralLinks/components/EditReferralLinkForm";

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/landing">
                        <ReferralLinkSimpleLandingPage />
                    </Route>
                    <Route exact={true} path="/landing/:linkId">
                        <ReferralLinkLandingPage />
                    </Route>
                    <Layout>
                        <Route exact={true} path="/">
                            <HomePage />
                        </Route>
                        <Route exact={true} path="/referral-links">
                            <ReferralLinkPage />
                        </Route>
                        <Route exact={true} path="/referral-link/:linkId/edit">
                            <EditReferralLinkForm />
                        </Route>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

render(<Root />, document.getElementById("root"));
