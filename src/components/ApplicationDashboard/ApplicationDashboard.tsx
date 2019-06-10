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
    applications: any;
}

export const ApplicationDashboard: FC<Props> = props => {
    console.log(props.applications);

    function daysLeft(date: string) {
        const closeDate = new Date(date);
        const closeDateTime = closeDate.getTime();
        const today = new Date();
        const timeToday = today.getTime();
        const timeleftBig = closeDateTime - timeToday;
        const timeLeft = Math.floor(timeleftBig / 1000 / 60 / 60);

        let timeToShow = timeLeft;
        let prefixToShow = "Hours";

        if (timeLeft > 24 && timeLeft < 48) {
            timeToShow = Math.floor(timeLeft / 24);
            prefixToShow = "Day left";
        } else if (timeLeft > 47) {
            //2days etc...
            timeToShow = Math.floor(timeLeft / 24);
            prefixToShow = "Days left";
        } else if (timeLeft === 1) {
            prefixToShow = "Hour left";
        } else if (timeLeft < 0) {
            timeToShow = 0;
            prefixToShow = "Ended";
        }

        return (
            <>
                <H4 mb={0}>{timeToShow}</H4>
                <span>{prefixToShow}</span>
            </>
        );
    }

    function friendlyDate(date: string) {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long"
        });
    }

    return (
        <>
            <Title>Dashboard</Title>
            <ApplicationContainer>
                <H4 mb={1}> Applications </H4>
                <span> In progress ( {props.applications.length} )</span>
                {props.applications &&
                    props.applications.length &&
                    props.applications.map((application: any) => {
                        return (
                            <ApplicationContainerItem key={application.id}>
                                <GridRow>
                                    <GridCol setWidth="50%">
                                        <Link
                                            as={RouterLink}
                                            to={`application/${application.id}`}
                                        >
                                            {application.name}
                                        </Link>
                                        <div>
                                            Application number:
                                            {application.number}
                                        </div>
                                        <div>
                                            Opportunity:
                                            {application.Opportunity.name}
                                        </div>
                                    </GridCol>
                                    <GridCol setWidth="25%">
                                        <ApplicationContainerTimeline>
                                            {daysLeft(application.closeDate)}
                                            <div>
                                                Deadline{" "}
                                                {friendlyDate(
                                                    application.closeDate
                                                )}
                                            </div>
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
