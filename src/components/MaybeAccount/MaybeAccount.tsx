import React, { FC, useCallback } from "react";

import { Link, RouteComponentProps } from "@reach/router";
import { Title, ukriGreen } from "ukripoc-components";
import GridRow from "@govuk-react/grid-row";
import GridCol from "@govuk-react/grid-col";
import { H2 } from "@govuk-react/heading";
import HintText from "@govuk-react/hint-text";

import Button from "@govuk-react/button";
import { AuthenticatorProps, changeAuthState } from "../../lib/account";
interface Props extends RouteComponentProps {
    authProps?: AuthenticatorProps;
}

export const MaybeAccount: FC<Props> = ({ navigate, authProps, ...props }) => {
    console.log(props);

    const signUp = useCallback(() => {
        authProps && changeAuthState("signUp", authProps);
    }, [authProps]);

    return (
        <>
            <Title>Do you have an account?</Title>
            <GridRow>
                <GridCol>
                    <H2 mb={2}>Yes</H2>
                    <HintText>Sign in to your Funding Service account</HintText>
                    <Link to="/login">
                        <Button buttonColour={ukriGreen}>Sign in</Button>
                    </Link>
                </GridCol>
                <GridCol>
                    <H2 mb={2}>No</H2>
                    <HintText>
                        Create a new account to start your application
                    </HintText>
                    <Link to="/createaccount/organisation" onClick={signUp}>
                        <Button buttonColour={ukriGreen}>
                            Continue and create an account
                        </Button>
                    </Link>
                </GridCol>
            </GridRow>
        </>
    );
};

export default MaybeAccount;
