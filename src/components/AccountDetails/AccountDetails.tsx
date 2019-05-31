import React, {
    FC,
    useState,
    useCallback,
    ChangeEvent,
    FormEvent
} from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { Title, ukriGreen } from "ukripoc-components";
import BackLink from "@govuk-react/back-link";
import Caption from "@govuk-react/caption";
import { H4 } from "@govuk-react/heading";
import { Organisation } from "../../types";
import A from "@govuk-react/link";
import Checkbox from "@govuk-react/checkbox";
import ErrorText from "@govuk-react/error-text";
import ErrorSummary from "@govuk-react/error-summary";
import HintText from "@govuk-react/hint-text";
import Input from "@govuk-react/input";
import { usePwnedPasswords } from "use-pwned-passwords";
import { useFormState } from "react-use-form-state";
import FormGroup from "@govuk-react/form-group";
import Button from "@govuk-react/button";
import styled from "styled-components";
import { createAccount } from "../../lib/account";
interface Props extends RouteComponentProps {
    organisation?: Organisation;
}

const ShowButton = styled(A)`
    width: 50px;
    margin-left: -50px;
    cursor: pointer;
`;

interface Form {
    password: string;
    email: string;
    phone: string;
    name: string;
    terms: boolean;
}

interface ErrorType {
    targetName?: string;
    text: string;
}

const handleErrorClick = (target: string) => {
    const els = document.getElementsByName(target);
    if (els.length) {
        els[0].focus();
    }
};

export const AccountDetails: FC<Props> = ({ organisation, navigate }) => {
    if (organisation === undefined && navigate) {
        navigate("../organisation");
    }

    const [, pwnedCount, passProps] = usePwnedPasswords();
    const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
    const [validationErrors, setValidationErrors] = useState<ErrorType[]>([]);

    const [formState, { password, text, email, tel, checkbox }] = useFormState<
        Form
    >();
    const [hidePassword, setHidePassword] = useState(true);

    let { password: passwordError, ...errors } = formState.errors;

    if (!passwordError && pwnedCount) {
        passwordError = `Your chosen password has been found in ${pwnedCount} leaks. Please choose a more secure password.`;
    }

    const togglePassword = useCallback(
        () => setHidePassword(current => !current),
        []
    );

    const validateForm = useCallback(() => {
        const errors: ErrorType[] = [];
        if (passwordError) {
            errors.push({ text: passwordError, targetName: "password" });
        }
        if (phoneError) {
            errors.push({ text: phoneError, targetName: "phone" });
        }
        (["name", "email"] as Array<keyof Form>).forEach(field => {
            const text = formState.errors[field];
            if (text) {
                errors.push({ text, targetName: field });
            }
        });
        if (!formState.values.terms) {
            errors.push({
                text: "You must accept the terms to proceed",
                targetName: "terms"
            });
        }
        setValidationErrors(errors);
        console.log(errors);
        return !errors.length;
    }, [formState, passwordError, phoneError, setValidationErrors]);

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();
            if (!validateForm() || !organisation) {
                console.warn("invalid form or no org:", organisation);
                return;
            }
            try {
                const result = await createAccount({
                    ...formState.values,
                    organisation
                });
                console.log(result);
            } catch (err) {
                console.warn(err);
            }
        },
        [validateForm, formState, organisation]
    );

    const checkPhone = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const value =
                event && event.currentTarget && event.currentTarget.value;

            const { parsePhoneNumberFromString } = await import(
                /* webpackChunkName: libphone */ "libphonenumber-js"
            );

            if (!value) {
                setPhoneError("Please enter a phone number");
                return;
            }

            const num = parsePhoneNumberFromString(value.toString(), "GB");
            console.log(num, value.toString());
            if (!num || !num.isPossible()) {
                setPhoneError("Please enter a valid phone number");
            } else {
                setPhoneError(undefined);
            }
        },
        [setPhoneError]
    );

    return (
        <>
            <BackLink as={Link} to="../organisation" />
            <Caption>Create account</Caption>
            <Title mb={4}>Your details</Title>
            {organisation && (
                <HintText>Your organisation: {organisation.Name}</HintText>
            )}
            <p>{JSON.stringify(formState)}</p>
            {!!validationErrors.length && (
                <ErrorSummary
                    errors={validationErrors}
                    onHandleErrorClick={handleErrorClick}
                />
            )}
            <form onSubmit={onSubmit}>
                <FormGroup error={errors.name} mb={3}>
                    <H4 mb={0}>Name</H4>
                    <ErrorText>{errors.name}</ErrorText>
                    <Input
                        {...text({
                            name: "name",
                            validate: (val: string) =>
                                val.length ? true : "Please enter your name"
                        })}
                        required
                        minLength={1}
                    />
                </FormGroup>

                <FormGroup error={phoneError || errors.phone} mb={3}>
                    <H4 mb={2}>Phone</H4>
                    <HintText>
                        We may use this to contact you about the application.
                    </HintText>
                    <ErrorText>{phoneError || errors.phone}</ErrorText>
                    <Input
                        {...tel({ name: "phone", onChange: checkPhone })}
                        required
                    />
                </FormGroup>
                <FormGroup error={errors.email} mb={3}>
                    <H4 mb={2}>Email</H4>
                    <ErrorText>{errors.email}</ErrorText>
                    <Input {...email({ name: "email" })} required />
                </FormGroup>

                <FormGroup error={passwordError} mb={3}>
                    <H4 mb={2}>Create password</H4>
                    <HintText>
                        Please choose a secure password at least 8 characters
                        long
                    </HintText>
                    <ErrorText>{passwordError}</ErrorText>

                    <div>
                        <Input
                            minLength={8}
                            required
                            autocomplete="new-password"
                            {...passProps}
                            {...password({
                                name: "password",
                                onBlur: passProps.onBlur,
                                onChange: passProps.onChange as (
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => void
                            })}
                            type={hidePassword ? "password" : "text"}
                            mb={1}
                        />
                        <ShowButton onClick={togglePassword}>
                            {hidePassword ? "Show" : "Hide"}
                        </ShowButton>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        {...checkbox({
                            name: "terms"
                        })}
                        required
                    >
                        Agree to the{" "}
                        <A href="http://example.com">Terms and Conditions</A>{" "}
                        (opens in new window).
                    </Checkbox>
                </FormGroup>
                <Button buttonColour={ukriGreen} type="submit">
                    Create account
                </Button>
            </form>
        </>
    );
};
export default AccountDetails;
