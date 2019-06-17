import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { AuthenticatorProps } from "../../lib/account";

interface Props extends RouteComponentProps {
    authProps?: AuthenticatorProps;
}

export const AuthRedirector: FC<Props> = ({ navigate, authProps }) => {
    if (!navigate || !authProps || !authProps.authState) return null;
    let to = "";
    switch (authProps.authState) {
        case "signUp":
            to = "/createaccount/organisation";
            break;

        case "signIn":
            to = "/";
            break;

        case "confirmSignUp":
            to = "/confirm";
            break;
    }
    console.log("redirecting to", to);
    if (to !== "") {
        navigate(to);
    }

    return <p />;
};

export default AuthRedirector;
