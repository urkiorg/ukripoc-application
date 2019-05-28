import React, { FC, HTMLAttributes, useState } from "react";
import { Title, ukriGreen } from "ukripoc-components";
import Caption from "@govuk-react/caption";
import GridRow from "@govuk-react/grid-row";
import GridCol from "@govuk-react/grid-col";
import { H2 } from "@govuk-react/heading";
import HintText from "@govuk-react/hint-text";
import { LoginScreen } from "../LoginScreen";
import BackLink from "@govuk-react/back-link";
import Button from "@govuk-react/button";

interface Props extends HTMLAttributes<HTMLElement> {}

export const ApplyPage: FC<Props> = () => {
    const [hasAccount, setHasAccount] = useState<"yes" | "no" | undefined>(
        undefined
    );

    const Back = () => <BackLink onClick={() => setHasAccount(undefined)} />;

    switch (hasAccount) {
        case "yes":
            return (
                <>
                    <Back />
                    <LoginScreen override="" />
                </>
            );
        case "no":
            return (
                <>
                    <Back />
                    <p>Signup</p>
                </>
            );

        default:
            return (
                <>
                    <Caption>Start new application</Caption>
                    <Title>Do you have an account?</Title>
                    <GridRow>
                        <GridCol>
                            <H2 mb={2}>Yes</H2>
                            <HintText>
                                Sign in to your Funding Service account
                            </HintText>
                            <Button
                                buttonColour={ukriGreen}
                                onClick={() => setHasAccount("yes")}
                            >
                                Sign in
                            </Button>
                        </GridCol>
                        <GridCol>
                            <H2 mb={2}>No</H2>
                            <HintText>
                                Create a new account to start your application
                            </HintText>
                            <Button
                                buttonColour={ukriGreen}
                                onClick={() => setHasAccount("no")}
                            >
                                Continue and create an account
                            </Button>
                        </GridCol>
                    </GridRow>
                </>
            );
    }
};

export default ApplyPage;
