import React, { FC, useEffect } from "react";
import Caption from "@govuk-react/caption";

import { RouteComponentProps } from "@reach/router";
import { MaybeAccount } from "../MaybeAccount";
import { AuthenticatorProps } from "../../lib/account";

interface Props extends RouteComponentProps {
    loggedIn?: boolean;
    opportunityId?: string;
    authProps?: AuthenticatorProps;
}

export const ApplyPage: FC<Props> = ({
    loggedIn,
    opportunityId,
    authProps
}) => {
    useEffect(() => {
        if (opportunityId) {
            window.localStorage.setItem("opportunityId", opportunityId);
        }
    }, [opportunityId]);
    return (
        <>
            <Caption>Start new application</Caption>
            <MaybeAccount authProps={authProps} />
        </>
    );
};

export default ApplyPage;
