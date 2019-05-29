import React, { FC } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { Title } from "ukripoc-components";
import BackLink from "@govuk-react/back-link";
import Caption from "@govuk-react/caption";
import { Organisation } from "../../types";
import HintText from "@govuk-react/hint-text";
interface Props extends RouteComponentProps {
    organisation?: Organisation;
}

export const AccountDetails: FC<Props> = ({ organisation }) => (
    <>
        <BackLink as={Link} to="../organisation" />
        <Caption>Create account</Caption>
        <Title>Your details</Title>
        {organisation && (
            <HintText>Your organisation: {organisation.Name}</HintText>
        )}
    </>
);

export default AccountDetails;
