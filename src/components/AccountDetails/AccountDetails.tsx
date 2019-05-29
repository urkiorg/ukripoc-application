import React, { FC } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { Title } from "ukripoc-components";
import BackLink from "@govuk-react/back-link";
import Caption from "@govuk-react/caption";
import { Organisation } from "../../types";
import HintText from "@govuk-react/hint-text";
import InputField from "@govuk-react/input-field";
import { usePwnedPasswords } from "use-pwned-passwords";
interface Props extends RouteComponentProps {
    organisation?: Organisation;
}

export const AccountDetails: FC<Props> = ({ organisation }) => {
    const [password, pwnedCount, passProps] = usePwnedPasswords();

    return (
        <>
            <BackLink as={Link} to="../organisation" />
            <Caption>Create account</Caption>
            <Title>Your details</Title>
            <p>{password}</p>
            {organisation && (
                <HintText>Your organisation: {organisation.Name}</HintText>
            )}
            <InputField name="name" mb={1}>
                Name
            </InputField>
            <InputField
                name="phone"
                input={{ type: "phone" }}
                hint={["We may use this to contact you about the application"]}
            >
                Phone number
            </InputField>
            <InputField name="email" input={{ type: "email" }} mb={1}>
                Email
            </InputField>
            <InputField
                name="password"
                input={{
                    type: "password",
                    ...passProps
                }}
                meta={{
                    touched: true,
                    error:
                        pwnedCount > 0 &&
                        `This password has been found in ${pwnedCount} leaks. Please choose a more secure password.`
                }}
                mb={1}
            >
                Password
            </InputField>
        </>
    );
};
export default AccountDetails;
