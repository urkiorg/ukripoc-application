import React, { FC, useState, useCallback } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import { Router } from "@reach/router";
import { ChooseOrganisation } from "../ChooseOrganisation";
import { AccountDetails } from "../AccountDetails";

interface Props extends RouteComponentProps {}
export const CreateAccountPage: FC<Props> = ({ navigate }) => {
    const [organisation, setOrganisation] = useState<number | undefined>(
        undefined
    );

    if (organisation === undefined && navigate) {
        navigate("organisation");
    }

    const onSetOrganisation = useCallback(
        (org: number) => {
            setOrganisation(org);
            navigate && navigate("./details");
        },
        [setOrganisation, navigate]
    );

    return (
        <>
            <Router>
                <AccountDetails
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
