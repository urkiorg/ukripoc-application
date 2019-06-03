import { Auth } from "aws-amplify";
import { Organisation } from "../types";
import { CognitoUser } from "@aws-amplify/auth";

type AuthState =
    | "signIn"
    | "signUp"
    | "signedUp"
    | "confirmSignIn"
    | "confirmSignUp"
    | "forgotPassword"
    | "verifyContact"
    | "signedIn"
    | "requireNewPassword"
    | "TOTPSetup"
    | "loading";
export interface AuthenticatorProps {
    authState?: AuthState;
    authData?: UserType;
    onStateChange?: (state: AuthState, data?: UserType) => void;
    onAuthEvent?: (state: AuthState, data?: AuthEvent) => void;
}

export type UserType = CognitoUser | { username: string };

interface AuthEvent {
    type?: string;
    data?: string;
}

export interface CreateUserProps {
    name: string;
    email: string;
    phone: string;
    password: string;
    organisation: Organisation;
}

export const triggerAuthEvent = (
    event: AuthEvent,
    props: AuthenticatorProps
) => {
    console.log("Auth event: ", event, props.onAuthEvent, props.authState);
    if (props.onAuthEvent && props.authState) {
        props.onAuthEvent(props.authState, event);
    }
};

export const changeAuthState = (
    state: AuthState,
    props: AuthenticatorProps,
    user?: UserType
) => {
    console.log("Auth state change:", { state, user });
    if (props.onStateChange) {
        props.onStateChange(state, user);
    }
    triggerAuthEvent({ type: "stateChange", data: state }, props);
};

const getErrorMessage = (error: string | Error) => {
    if (typeof error === "string") {
        return error;
    }
    return error.message ? error.message : JSON.stringify(error);
};

export const triggerAuthError = (
    error: string | Error,
    props: AuthenticatorProps
) => {
    const data = getErrorMessage(error);
    console.warn("Auth error", error);
    triggerAuthEvent(
        {
            type: "error",
            data
        },
        props
    );
};

export const checkUser = async (props: AuthenticatorProps) => {
    const user: CognitoUser | undefined = await Auth.currentAuthenticatedUser();
    const state = user ? "signedIn" : "signIn";
    changeAuthState(state, props, user);
};

export const checkContact = async (
    user: UserType,
    props: AuthenticatorProps
) => {
    const data = await Auth.verifiedContact(user);
    if (Object.keys(data.verified).length !== 0) {
        changeAuthState("signedIn", props, user);
    } else {
        user = Object.assign(user, data);
        changeAuthState("verifyContact", props, user);
    }
};

export const createAccount = async ({
    name,
    email,
    phone,
    password,
    organisation: { ID: organisation_id, Name: organisation_name }
}: CreateUserProps) => {
    const { parsePhoneNumberFromString } = await import(
        /* webpackChunkName: "libphone" */ "libphonenumber-js"
    );

    const num = parsePhoneNumberFromString(phone.toString(), "GB");

    return Auth.signUp({
        username: email,
        password,
        attributes: {
            name,
            email,
            phone_number: num && num.format("E.164"),
            "custom:organisation_id": organisation_id,
            "custom:organisation_name": organisation_name
        }
    });
};

export const isCognitoUser = (user: UserType): user is CognitoUser =>
    "getUsername" in user;

export const getUsername = (user: UserType) =>
    isCognitoUser(user) ? user.getUsername() : user.username;

export const signIn = async (
    username: string,
    password: string,
    props: AuthenticatorProps
) => {
    try {
        const user = await Auth.signIn(username, password);
        console.log({ user });
        if (
            user.challengeName === "SMS_MFA" ||
            user.challengeName === "SOFTWARE_TOKEN_MFA"
        ) {
            changeAuthState("confirmSignIn", props, user);
        } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            changeAuthState("requireNewPassword", props, user);
        } else if (user.challengeName === "MFA_SETUP") {
            changeAuthState("TOTPSetup", props, user);
        } else {
            checkContact(user, props);
        }
        return user;
    } catch (err) {
        if (err.code === "UserNotConfirmedException") {
            changeAuthState("confirmSignUp", props, { username });
        } else if (err.code === "PasswordResetRequiredException") {
            changeAuthState("forgotPassword", props, { username });
        } else {
            triggerAuthError(err, props);
        }
    }
};
