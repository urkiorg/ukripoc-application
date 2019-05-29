import React, { FC } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { Title } from "ukripoc-components";
import BackLink from "@govuk-react/back-link";
import Caption from "@govuk-react/caption";
import { Organisation } from "../../types";

interface Props extends RouteComponentProps {
    organisation?: Organisation;
}

export const AccountDetails: FC<Props> = ({ organisation }) => (
    <>
        <BackLink as={Link} to="../organisation" />
        <Caption>Create account</Caption>
        <Title>Your details</Title>
    </>
);

export default AccountDetails;
