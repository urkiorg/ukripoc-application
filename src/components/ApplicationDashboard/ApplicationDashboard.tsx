import React, { FC } from "react";

import Link from "@govuk-react/link";
import { RouteComponentProps, Link as RouterLink } from "@reach/router";

import { Title } from "ukripoc-components";

import { H4 } from "@govuk-react/heading";
import { NTA_LIGHT } from "@govuk-react/constants";
import { GREY_3, GREY_2 } from "govuk-colours";

import GridRow from "@govuk-react/grid-row";
import GridCol from "@govuk-react/grid-col";

import styled from "styled-components";
import { ListFundingApplicationsQuery } from "../../API";

import { daysLeft, friendlyDate } from "../../lib/dateandtime";

import P from "@govuk-react/paragraph";

export const ApplicationContainer = styled.div`
    background: ${GREY_3};
    padding: 20px;
    margin-bottom: 30px;
`;

export const ApplicationContainerItem = styled.div`
    font-family: ${NTA_LIGHT};
    background: white;
    padding: 20px;
    margin-top: 10px;
    border: 1px solid ${GREY_2};
`;

export const ApplicationContainerItemComplete = styled.div`
    font-family: ${NTA_LIGHT};
    font-weight: bold;
    line-height: 70px;
    text-align: center;
    border-left: 1px dotted ${GREY_3};
`;

export const ApplicationContainerTimeline = styled.div`
    font-family: ${NTA_LIGHT};
    text-align: center;
`;

interface Props extends RouteComponentProps {
    applications?: ListFundingApplicationsQuery; //change when not mocked
}

export const ApplicationDashboard: FC<Props> = props => {
    const applications =
        props.applications &&
        props.applications.listFundingApplications &&
        props.applications.listFundingApplications.items;

    return (
        <>
            <Title>Dashboard</Title>
            <ApplicationContainer>
                <H4 mb={1}> Applications </H4>

                <span>
                    In progress ({applications ? applications.length : 0})
                </span>

                {applications &&
                    applications.map(application => {
                        if (!application) {
                            return null;
                        }

                        const timeLeft = daysLeft(application.closeDate);

                        const closeDate: string | null = friendlyDate(
                            application.closeDate
                        );

                        return (
                            <ApplicationContainerItem key={application.id}>
                                <GridRow>
                                    <GridCol setWidth="50%">
                                        <Link
                                            as={RouterLink}
                                            to={`application/${application.id}`}
                                        >
                                            {application.opportunityName}
                                        </Link>

                                        <GridRow>
                                            Application number:
                                            {application.id}
                                        </GridRow>

                                        <GridRow>
                                            Opportunity:
                                            {application.opportunityDescription}
                                        </GridRow>
                                    </GridCol>
                                    <GridCol setWidth="25%">
                                        <ApplicationContainerTimeline>
                                            {timeLeft && (
                                                <>
                                                    <H4 mb={1}>
                                                        {timeLeft.time}
                                                    </H4>
                                                    <P mb={1}>
                                                        {timeLeft.suffix}
                                                    </P>
                                                </>
                                            )}
                                            Deadline {closeDate}
                                        </ApplicationContainerTimeline>
                                    </GridCol>
                                    <GridCol setWidth="25%">
                                        <ApplicationContainerItemComplete>
                                            0% complete
                                        </ApplicationContainerItemComplete>
                                    </GridCol>
                                </GridRow>
                            </ApplicationContainerItem>
                        );
                    })}
            </ApplicationContainer>
        </>
    );
};

export default ApplicationDashboard;
