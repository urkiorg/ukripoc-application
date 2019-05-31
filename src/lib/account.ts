import { Auth } from "aws-amplify";
import { Organisation } from "../types";

export interface CreateUserProps {
    name: string;
    email: string;
    phone: string;
    password: string;
    organisation: Organisation;
}

export const createAccount = async ({
    name,
    email,
    phone,
    password,
    organisation: { ID: organisation_id, Name: organisation_name }
}: CreateUserProps) => {
    const { parsePhoneNumberFromString } = await import(
        /* webpackChunkName: libphone */ "libphonenumber-js"
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
