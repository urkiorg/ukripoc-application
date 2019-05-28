import React, { FC, useState, useEffect, useCallback } from "react";
import Amplify, { Hub } from "aws-amplify";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "react-apollo-hooks";
import Main from "@govuk-react/main";
import { Router } from "@reach/router";

import config from "./aws-exports";
import { UkriHeader, UkriFooter } from "ukripoc-components";
import { AuthController } from "./components/AuthController";

import { Authenticator } from "aws-amplify-react";

import "ukripoc-components/fonts.scss";

import { HubCallback } from "@aws-amplify/core/lib/Hub";
import { ApplicationDashboard } from "./components/ApplicationDashboard";
import { Route } from "./components/Route";
import { LoginScreen } from "./components/LoginScreen";
import { ApplyPage } from "./components/ApplyPage";
import { CreateAccountPage } from "./components/CreateAccountPage";

const client = new AWSAppSyncClient({
    url: config.aws_appsync_graphqlEndpoint,
    region: config.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        // apiKey: config.aws_appsync_apiKey
        jwtToken: async () =>
            (await Auth.currentSession()).getAccessToken().getJwtToken()
    }
});

const routes = {
    Funding: "/",
    Research: "/",
    Innovation: "/",
    Skills: "/",
    News: "/",
    "Public engagement": "/",
    "About us": "/"
};

Amplify.configure(config);

// retrieve temporary AWS credentials and sign requests
Auth.configure(config);

export const App: FC = (props: any) => {
    const [user, setUser] = useState<CognitoUser | undefined>(undefined);

    useEffect(() => {
        const checkAuthenticatedUser = async () => {
            try {
                const u = await Auth.currentAuthenticatedUser();
                console.log("user", user);
                setUser(u);
            } catch {
                setUser(undefined);
            }
        };
        checkAuthenticatedUser();
    });
    const handleAuthStateChange: HubCallback = useCallback(
        async data => {
            const state = data.payload.event;

            console.log("state", state);
            if (state === "signedIn" || state === "signIn") {
                const u = await Auth.currentAuthenticatedUser();
                setUser(u);
            } else {
                setUser(undefined);
            }
        },
        [setUser]
    );

    useEffect(() => {
        Hub.listen("auth", handleAuthStateChange);
        return () => Hub.remove("auth", handleAuthStateChange);
    }, [handleAuthStateChange]);

    return (
        // See https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/166 for why we need to coerce to any
        <ApolloProvider client={client as any}>
            <UkriHeader user={user} routes={routes} />
            <Main>
                <Authenticator authState="signIn" hideDefault={true}>
                    <Router>
                        <AuthController loggedIn={!!user} path="/">
                            <ApplicationDashboard />
                        </AuthController>
                        <Route component={LoginScreen} path="/login" />
                        <ApplyPage
                            loggedIn={!!user}
                            path="/apply/:opportunityId"
                        />
                        <CreateAccountPage path="/createaccount/*" />
                    </Router>
                </Authenticator>
            </Main>
            <UkriFooter />
        </ApolloProvider>
    );
};

(window as any).LOG_LEVEL = "DEBUG";

export default App;
