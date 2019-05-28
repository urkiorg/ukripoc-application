import React, { FC, useState, FormEvent, useCallback } from "react";
import { ukriGreen, Title } from "ukripoc-components";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import LabelText from "@govuk-react/label-text";
import ErrorSummary from "@govuk-react/error-summary";
import { navigate } from "@reach/router";
import ErrorText from "@govuk-react/error-text";
import { Auth } from "aws-amplify";
import Caption from "@govuk-react/caption";
import LoadingBox from "@govuk-react/loading-box";

import { CognitoUser } from "@aws-amplify/auth";

interface Props {
    override?: string;
}

export const LoginScreen: FC<Props> = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usernameWarning, setUsernameWarning] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState(false);
    const [mustChangePassword, setMustChangePassword] = useState(false);
    const [user, setUser] = useState<CognitoUser | undefined>(undefined);
    const [newPassword, setNewPassword] = useState<string | undefined>(
        undefined
    );
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<
        string | undefined
    >(undefined);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const onChangeNewPassword = useCallback(
        (e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            console.log(value, newPasswordConfirm);
            setNewPassword(value);
            if (
                newPasswordConfirm !== undefined &&
                newPasswordConfirm !== value
            ) {
                setPasswordMatchError(true);
            } else {
                setPasswordMatchError(false);
            }
        },
        [setNewPassword, newPasswordConfirm]
    );

    const onChangeConfirmPassword = useCallback(
        (e: Event) => {
            const value = (e.target as HTMLInputElement).value;

            console.log(value, newPassword);

            setNewPasswordConfirm(value);
            if (value && newPassword !== value) {
                setPasswordMatchError(true);
            } else {
                setPasswordMatchError(false);
            }
        },
        [setNewPasswordConfirm, newPassword]
    );

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

    const changePassword = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (passwordMatchError || !newPassword || !user) {
                return;
            }
            try {
                const loggedUser = await Auth.completeNewPassword(
                    user, // the Cognito User Object
                    newPassword,
                    {}
                );
                console.log(loggedUser);
                setMustChangePassword(false);
                navigate("/");
            } catch (e) {
                console.error("Error", e);
            }
        },
        [user, newPassword, passwordMatchError]
    );

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            setLoading(true);

            validateInput();

            if (password.length > 0 && username.length > 0) {
                try {
                    const user = await Auth.signIn(username, password);
                    console.log(user);
                    setUser(user);
                    setLoading(false);
                    setError(false);
                    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                        setMustChangePassword(true);
                    } else {
                        navigate(`/`);
                    }
                } catch (error) {
                    console.warn(error);
                    setError(true);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        },
        [username, password, validateInput]
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
            <Caption>Welcome</Caption>
            <Title>Please log in</Title>
            {mustChangePassword ? (
                <form onSubmit={changePassword}>
                    <ErrorSummary
                        heading={"Please change your password"}
                        description={
                            "Your account password must be changed before you use this service. Please choose a new password below."
                        }
                        errors={[]}
                    />
                    <LabelText>New password {newPassword}</LabelText>

                    <Input
                        key="newpass"
                        error={passwordMatchError}
                        type="password"
                        mb={4}
                        value={newPassword}
                        onChange={onChangeNewPassword}
                    />
                    <LabelText>Confirm new password</LabelText>
                    {passwordMatchError && (
                        <ErrorText>Your passwords don't match.</ErrorText>
                    )}
                    <Input
                        key="conmfirmpass"
                        error={passwordMatchError}
                        type="password"
                        mb={4}
                        value={newPasswordConfirm}
                        onChange={onChangeConfirmPassword}
                    />
                    <Button
                        disabled={passwordMatchError || !newPassword}
                        onClick={changePassword}
                        buttonColour={ukriGreen}
                    >
                        Change password
                    </Button>
                </form>
            ) : (
                <LoadingBox loading={loading}>
                    <form onSubmit={handleSubmit}>
                        <LabelText>Email</LabelText>
                        {usernameWarning && (
                            <ErrorText>
                                Please enter your email address.
                            </ErrorText>
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
            )}
        </div>
    );
};

export default LoginScreen;
