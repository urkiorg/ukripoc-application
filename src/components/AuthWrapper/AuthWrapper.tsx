import React, { FC } from "react";
import { Router } from "@reach/router";
import { LoginScreen } from "../LoginScreen";
import { ApplyPage } from "../ApplyPage";
import { CreateAccountPage } from "../CreateAccountPage";
import { AuthenticatorProps } from "../../lib/account";
import { MaybeAccount } from "../MaybeAccount";
import { AuthRedirector } from "../AuthRedirector";
import { ConfirmSignUp } from "../ConfirmSignUp";
import { ApplicationDashboardPage } from "../ApplicationDashboardPage";

interface Props extends AuthenticatorProps {}

export const AuthWrapper: FC<Props> = props => {
    console.log(props);
    return (
        <>
            <Router>
                <AuthRedirector default authProps={props} />
                {props.authState === "signedIn" ? (
                    <ApplicationDashboardPage path="/" />
                ) : (
                    <MaybeAccount authProps={props} path="/" />
                )}

                <LoginScreen authProps={props} path="/login" />
                <ApplyPage
                    authProps={props}
                    loggedIn={props.authState === "signedIn"}
                    path="/apply/:opportunityId"
                />
                {props.authState === "signUp" && (
                    <CreateAccountPage
                        authProps={props}
                        path="/createaccount/*"
                    />
                )}
                {props.authState === "confirmSignUp" && (
                    <ConfirmSignUp authProps={props} path="/confirm" />
                )}
                <ConfirmSignUp authProps={props} path="/confirm/:code" />
            </Router>
        </>
    );
};

export default AuthWrapper;
