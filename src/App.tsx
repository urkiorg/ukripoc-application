import React, { FC, useState, useEffect, useCallback } from "react";
import Amplify from "aws-amplify";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "react-apollo-hooks";
import Main from "@govuk-react/main";

import config from "./aws-exports";
import { UkriHeader, UkriFooter } from "ukripoc-components";

import { Authenticator } from "aws-amplify-react";

import "ukripoc-components/fonts.scss";

import { AuthWrapper } from "./components/AuthWrapper";
import { navigate } from "@reach/router";
import { isCognitoUser, UserType } from "./lib/account";

import { Router } from "@reach/router";
import { ApplicationPage } from "./components/ApplicationPage";

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

export const App: FC = () => {
    const [user, setUser] = useState<CognitoUser | undefined>(undefined);

    useEffect(() => {
        const checkAuthenticatedUser = async () => {
            try {
                const u = await Auth.currentAuthenticatedUser();
                console.log("user", u);
                setUser(u);
            } catch (e) {
                console.warn("user err", e);
                setUser(undefined);
            }
        };
        checkAuthenticatedUser();
    }, []);

    const handleStateChange = useCallback(
        (state: string, user?: UserType) => {
            console.log("NEW STATE", state, user);
            if (state === "confirmSignUp") {
                navigate("/confirm");
            }
            if (!user || isCognitoUser(user)) {
                console.log("setting user", user);
                setUser(user);
            } else {
                console.log("not a user", user);
            }
        },
        [setUser]
    );

    return (
        // See https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/166 for why we need to coerce to any
        <ApolloProvider client={client as any}>
            <UkriHeader user={user} routes={routes} />
            <Main>
                <Authenticator
                    hideDefault={true}
                    onStateChange={handleStateChange}
                >
                    <AuthWrapper />
                </Authenticator>

                <Router>
                    <ApplicationPage path="/application/:id" />
                </Router>
            </Main>
            <UkriFooter />
        </ApolloProvider>
    );
};

(window as any).LOG_LEVEL = "DEBUG";

export default App;
