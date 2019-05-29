import React, { FC, useState, useCallback, useEffect } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import { Router } from "@reach/router";
import { ChooseOrganisation } from "../ChooseOrganisation";
import { AccountDetails } from "../AccountDetails";
import { Organisation } from "../../types";

interface Props extends RouteComponentProps {}
export const CreateAccountPage: FC<Props> = ({ navigate }) => {
    const [organisation, setOrganisation] = useState<Organisation | undefined>(
        undefined
    );

    useEffect(() => {
        if (organisation === undefined && navigate) {
            navigate("organisation");
        }
    }, [organisation, navigate]);

    const onSetOrganisation = useCallback(
        (org: Organisation) => {
            console.log({ navigate });
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