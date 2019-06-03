import React, { FC, useState, useCallback } from "react";
import { RouteComponentProps } from "@reach/router";
import { Router } from "@reach/router";
import { ChooseOrganisation } from "../ChooseOrganisation";
import { AccountDetails } from "../AccountDetails";
import { Organisation } from "../../types";
import { AuthenticatorProps } from "../../lib/account";

interface Props extends RouteComponentProps {
    authProps?: AuthenticatorProps;
}
export const CreateAccountPage: FC<Props> = ({ navigate, authProps }) => {
    const [organisation, setOrganisation] = useState<Organisation | undefined>(
        undefined
    );

    const onSetOrganisation = useCallback(
        (org: Organisation) => {
            console.log({ navigate });
            setOrganisation(org);
            navigate && navigate("/createaccount/details");
        },
        [setOrganisation, navigate]
    );

    return (
        <>
            <Router>
                <AccountDetails
                    authProps={authProps}
                    default
                    path="details"
                    organisation={organisation}
                />
                <ChooseOrganisation
                    path="organisation"
                    onSetOrganisation={onSetOrganisation}
                />
            </Router>
        </>
    );
};

export default CreateAccountPage;
