import React, { FC, useState, FormEvent, useCallback, useEffect } from "react";
import { ukriGreen, Title } from "ukripoc-components";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import LabelText from "@govuk-react/label-text";
import ErrorSummary from "@govuk-react/error-summary";
import {
    navigate,
    Link,
    RouterProps,
    RouteComponentProps
} from "@reach/router";
import ErrorText from "@govuk-react/error-text";
import { Auth } from "aws-amplify";
import Caption from "@govuk-react/caption";
import LoadingBox from "@govuk-react/loading-box";
import BackLink from "@govuk-react/back-link";
import { signIn, AuthenticatorProps, changeAuthState } from "../../lib/account";

interface Props extends RouteComponentProps {
    override?: string;
    authProps: AuthenticatorProps;
}

export const LoginScreen: FC<Props> = ({ authProps, navigate }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usernameWarning, setUsernameWarning] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState(false);

    useEffect(() => {
        if (!authProps) {
            return;
        }
        if (authProps.authState === "signUp") {
            console.log("changing state from", authProps.authState);
            changeAuthState("signIn", authProps);
            return;
        } else if (!navigate) {
            return;
        }
        if (authProps.authState === "confirmSignUp") {
            navigate("/confirm");
        } else if (authProps.authState === "signedIn") {
            navigate("/");
        }
    }, [authProps, navigate]);

    const onInputChangeUsername = useCallback(
        (e: Event) => {
            setUsername((e.target as HTMLInputElement).value);
        },
        [setUsername]
    );

    const onInputChangePassword = useCallback(
        (e: Event) => {
            setPassword((e.target as HTMLInputElement).value);
        },
        [setPassword]
    );

    const validateInput = useCallback(() => {
        if (username.length === 0) {
            setUsernameWarning(true);
        } else {
            setUsernameWarning(false);
        }

        if (password.length === 0) {
            setPasswordWarning(true);
        } else {
            setPasswordWarning(false);
        }
    }, [username, password, setUsernameWarning]);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            setLoading(true);

            validateInput();

            if (password.length > 0 && username.length > 0) {
                try {
                    await signIn(username, password, authProps);
                } catch (error) {
                    console.warn(error);
                    setError(true);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        },
        [username, password, validateInput, authProps]
    );

    return (
        <div>
            {error && (
                <ErrorSummary
                    heading={
                        "Your sign in was unsuccessful because of the following issues"
                    }
                    description={
                        "Your email/password combination doesn't seem to work."
                    }
                    errors={[]}
                />
            )}
            <BackLink as={Link} to="/" />
            <Caption>Welcome</Caption>
            <Title>Please log in</Title>

            <LoadingBox loading={loading}>
                <form onSubmit={handleSubmit}>
                    <LabelText>Email</LabelText>
                    {usernameWarning && (
                        <ErrorText>Please enter your email address.</ErrorText>
                    )}
                    <Input
                        error={error || usernameWarning}
                        type="email"
                        mb={4}
                        value={username}
                        onChange={onInputChangeUsername}
                    />
                    <LabelText>Password</LabelText>
                    {passwordWarning && (
                        <ErrorText>Please enter your password.</ErrorText>
                    )}
                    <Input
                        error={error || usernameWarning}
                        type="password"
                        mb={4}
                        value={password}
                        onChange={onInputChangePassword}
                    />
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        buttonColour={ukriGreen}
                    >
                        {loading ? "Please wait" : "Login"}
                    </Button>
                </form>
            </LoadingBox>
        </div>
    );
};

export default LoginScreen;
