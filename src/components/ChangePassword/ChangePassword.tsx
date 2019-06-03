import React, { FC, useState, FormEvent, useCallback, useEffect } from "react";
import { ukriGreen } from "ukripoc-components";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import LabelText from "@govuk-react/label-text";
import ErrorSummary from "@govuk-react/error-summary";
import { RouteComponentProps } from "@reach/router";
import ErrorText from "@govuk-react/error-text";
import { Auth } from "aws-amplify";
import {
    AuthenticatorProps,
    changeAuthState,
    checkContact
} from "../../lib/account";

interface Props extends RouteComponentProps {
    authProps?: AuthenticatorProps;
}

export const ChangePassword: FC<Props> = ({ authProps }) => {
    const [newPassword, setNewPassword] = useState<string | undefined>(
        undefined
    );
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<
        string | undefined
    >(undefined);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    useEffect(() => {
        if (authProps && authProps.authState === "signUp") {
            console.log("changing state from", authProps.authState);
            changeAuthState("signIn", authProps);
        }
    }, [authProps]);

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

    const changePassword = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (
                passwordMatchError ||
                !newPassword ||
                !authProps ||
                !authProps.authData
            ) {
                return;
            }
            try {
                await Auth.completeNewPassword(
                    authProps.authData,
                    newPassword,
                    {}
                );
                checkContact(authProps.authData, authProps);
            } catch (e) {
                console.error("Error", e);
            }
        },
        [authProps, newPassword, passwordMatchError]
    );

    return (
        <form onSubmit={changePassword}>
            <ErrorSummary
                heading={"Please change your password"}
                description={
                    "Your account password must be changed before you use this service. Please choose a new password below."
                }
                errors={[]}
            />
            <LabelText>New password</LabelText>

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
                key="confirmpass"
                error={passwordMatchError}
                type="password"
                mb={4}
                value={newPasswordConfirm}
                onChange={onChangeConfirmPassword}
            />
            <Button
                disabled={passwordMatchError || !newPassword}
                buttonColour={ukriGreen}
                type="submit"
            >
                Change password
            </Button>
        </form>
    );
};

export default ChangePassword;
