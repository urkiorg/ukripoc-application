import React, { FC, useState, useEffect, useCallback } from "react";
import { RouteComponentProps, Link as RouterLink } from "@reach/router";
import Caption from "@govuk-react/caption";
import { Title, ukriGreen } from "ukripoc-components";
import Link from "@govuk-react/link";
import BackLink from "@govuk-react/back-link";
import Button from "@govuk-react/button";
import Label from "@govuk-react/label";
import { Organisation } from "../../types";
import Autocomplete from "accessible-autocomplete/react";
import SectionBreak from "@govuk-react/section-break";

import "accessible-autocomplete/dist/accessible-autocomplete.min.css";
interface Props extends RouteComponentProps {
    onSetOrganisation: (org: Organisation) => void;
}

export const ChooseOrganisation: FC<Props> = ({ onSetOrganisation }) => {
    const [organisations, setOrganisations] = useState<{
        [key: string]: Organisation;
    }>({});
    const [orgList, setOrglist] = useState<string[]>([]);

    const [chosen, setChosen] = useState<Organisation | undefined>(undefined);

    useEffect(() => {
        const loadOrgs = async () => {
            const orgs: Organisation[] = await require("../../organisations.json");
            if (!orgs) {
                return;
            }
            const orgmap = orgs.reduce(
                (prev, next) => {
                    prev[next.Name] = next;
                    return prev;
                },
                {} as { [key: string]: Organisation }
            );
            setOrganisations(orgmap);
            setOrglist(Object.keys(orgmap));
        };
        loadOrgs();
    }, []);

    const lookup = useCallback(
        (query: string, syncResults: (results: string[]) => void) => {
            const q = query.toLowerCase();
            syncResults(orgList.filter(item => item.toLowerCase().includes(q)));
        },
        [orgList]
    );

    const onChoose = useCallback(
        (chosen: string) => {
            const org = organisations[chosen];
            if (org) {
                setChosen(org);
            }
        },
        [organisations]
    );

    const confirmChoice = useCallback(() => {
        if (chosen) onSetOrganisation(chosen);
    }, [onSetOrganisation, chosen]);

    const clearChoice = useCallback(() => {
        setChosen(undefined);
    }, [setChosen]);

    return (
        <>
            <BackLink as={RouterLink} to="../.." />
            <Caption>Create account</Caption>
            <Title>Find your organisation</Title>
            <p>{organisations && organisations.length}</p>
            {chosen ? (
                <p>
                    <Label>{chosen.Name} </Label>
                    <Link href="#" onClick={clearChoice}>
                        Change
                    </Link>
                </p>
            ) : (
                <Autocomplete source={lookup} onConfirm={onChoose} />
            )}
            {chosen && (
                <Button onClick={confirmChoice} buttonColour={ukriGreen}>
                    Set organisation
                </Button>
            )}
            <SectionBreak mb={9} />
        </>
    );
};

export default ChooseOrganisation;
