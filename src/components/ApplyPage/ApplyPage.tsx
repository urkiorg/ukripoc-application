import React, { FC, useEffect } from "react";
import Caption from "@govuk-react/caption";

import { RouteComponentProps } from "@reach/router";
import { MaybeAccount } from "../MaybeAccount";

interface Props extends RouteComponentProps {
    loggedIn?: boolean;
    opportunityId?: string;
}

export const ApplyPage: FC<Props> = ({ loggedIn, opportunityId }) => {
    useEffect(() => {
        if (opportunityId) {
            window.localStorage.setItem("opportunityId", opportunityId);
        }
    }, [opportunityId]);
    return (
        <>
            <Caption>Start new application</Caption>
            <MaybeAccount />
        </>
    );
};

export default ApplyPage;
