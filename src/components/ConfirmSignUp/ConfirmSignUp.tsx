import React, {
    FC,
    useState,
    ChangeEvent,
    useCallback,
    FormEvent,
    MouseEvent
} from "react";
import { RouteComponentProps } from "@reach/router";
import { AuthenticatorProps, getUsername } from "../../lib/account";
import { Title, ukriGreen } from "ukripoc-components";
import Caption from "@govuk-react/caption";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import LabelText from "@govuk-react/label-text";
import { NTA_LIGHT } from "@govuk-react/constants";

import { LINK_COLOUR } from "govuk-colours";

import styled from "styled-components";
import Auth from "@aws-amplify/auth";

interface Props extends RouteComponentProps {
    authProps?: AuthenticatorProps;
}

export const LinkButton = styled.button`
    font-family: ${NTA_LIGHT};
    text-decoration: underline;
    background-color: inherit;
    border: none;
    font-size: 20px;
    color: ${LINK_COLOUR};
    line-height: 35px;
    cursor: pointer;
`;

export const ConfirmSignUp: FC<Props> = ({ authProps, navigate }) => {
    if ((!authProps || !authProps.authData) && navigate) {
        navigate("/login");
    }

    const [code, setCode] = useState("");

    const updateCode = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            setCode(event.currentTarget.value);
        },
        [setCode]
    );

    const confirmSignup = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!authProps) {
                return;
            }
            const { authData } = authProps;
            if (!authData) {
                return;
            }

            try {
                const res = await Auth.confirmSignUp(
                    getUsername(authData),
                    code
                );
                if (authProps.onStateChange) {
                    authProps.onStateChange("signedIn", authData);
                }
                console.log("confirmed:", res, authData);
            } catch (err) {
                console.error(err);
            }
        },
        [authProps, code]
    );

    const resend = useCallback(
        async (e: MouseEvent<any>) => {
            e.preventDefault();
            if (!authProps) {
                return;
            }
            const { authData } = authProps;
            if (!authData) {
                return;
            }
            console.log({ authData });
            try {
                await Auth.resendSignUp(getUsername(authData));
            } catch (err) {
                console.error(err);
            }
        },
        [authProps]
    );

    return (
        <form onSubmit={confirmSignup}>
            <Caption>Create account</Caption>
            <Title mb={4}>Confirm account</Title>
            <Caption>A confirmation code has been sent to you</Caption>

            <LabelText>Please enter the confirmation code</LabelText>

            <Input mb={4} value={code} onChange={updateCode} />
            <Button
                onClick={confirmSignup}
                buttonColour={ukriGreen}
                type="submit"
                disabled={code.length < 6}
            >
                Confirm account
            </Button>
            <LinkButton onClick={resend}>Re-send code</LinkButton>
        </form>
    );
};

export default ConfirmSignUp;
