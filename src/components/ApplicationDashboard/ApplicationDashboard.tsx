import React, { FC } from "react";
import Link from "@govuk-react/link";
import { RouteComponentProps, Link as RouterLink } from "@reach/router";
import { Title } from "ukripoc-components";
import { GREY_3, GREY_2 } from "govuk-colours";
import { H4 } from "@govuk-react/heading";
import { NTA_LIGHT } from "@govuk-react/constants";
import P from "@govuk-react/paragraph";
import GridRow from "@govuk-react/grid-row";
import GridCol from "@govuk-react/grid-col";
import styled from "styled-components";
import LoadingBox from "@govuk-react/loading-box";
import { FundingApplications, FundingApplication } from "../../types";

import { daysLeft, friendlyDate } from "../../lib/dateandtime";
import { ApolloError } from "apollo-client";

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
    applications?: FundingApplications | null;
    loading?: boolean;
    error?: ApolloError;
}

const renderApplications = (applications: FundingApplications) => (
    <React.Fragment>
        <P>In progress ({applications.length})</P>
        {applications &&
            applications.length &&
            applications.map((application: FundingApplication | null) => {
                if (!application) {
                    return null;
                }

                const timeLeft = daysLeft(application.closeDate);

                const closeDate: string | null = friendlyDate(
                    application.closeDate
                );

                return (
                    application && (
                        <ApplicationContainerItem key={application.id}>
                            <GridRow>
                                <GridCol setWidth="50%">
                                    <Link
                                        as={RouterLink}
                                        to={`application/${application.id}`}
                                    >
                                        {application.opportunityName}
                                    </Link>
                                    <div>Application number:</div>
                                    <div>
                                        Opportunity:
                                        {application.opportunityName}
                                    </div>
                                </GridCol>
                                <GridCol setWidth="25%">
                                    <ApplicationContainerTimeline>
                                        {timeLeft && (
                                            <>
                                                <H4 mb={1}>{timeLeft.time}</H4>
                                                <span>{timeLeft.suffix}</span>
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
                    )
                );
            })}
    </React.Fragment>
);

const renderNoApplications = () => <P>You do not have any applications</P>;

export const ApplicationDashboard: FC<Props> = ({
    applications,
    loading,
    error
}) => (
    <>
        <Title>Dashboard</Title>
        <LoadingBox loading={loading}>
            {!error ? (
                <ApplicationContainer>
                    <H4 mb={1}> Applications </H4>
                    {applications && applications.length > 0
                        ? renderApplications(applications)
                        : renderNoApplications()}
                </ApplicationContainer>
            ) : (
                <P>Sorry, we are unable to show your applications.</P>
            )}
        </LoadingBox>
    </>
);

export default ApplicationDashboard;
