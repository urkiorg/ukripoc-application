import React, { FC } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Caption from "@govuk-react/caption";
import { Title } from "ukripoc-components";
import BackLink from "@govuk-react/back-link";
import Button from "@govuk-react/button";

interface Props extends RouteComponentProps {
    onSetOrganisation: (org: number) => void;
}

export const ChooseOrganisation: FC<Props> = ({ onSetOrganisation }) => (
    <>
        <BackLink as={Link} to="../.." />
        <Caption>Create account</Caption>
        <Title>Find your organisation</Title>
        <p>
            <Button onClick={() => onSetOrganisation(1)}>
                Set organisation
            </Button>
        </p>
    </>
);

export default ChooseOrganisation;
