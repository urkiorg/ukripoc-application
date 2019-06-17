import React, { FC } from "react";

import Link from "@govuk-react/link";
import { RouteComponentProps, Link as RouterLink } from "@reach/router";

import { Title } from "ukripoc-components";

import { H3 } from "@govuk-react/heading";
import Caption from "@govuk-react/caption";
import Table from "@govuk-react/table";
import { NTA_LIGHT } from "@govuk-react/constants";
import { GREY_4 } from "govuk-colours";

import Label from "@govuk-react/label-text";
import GridRow from "@govuk-react/grid-row";
import GridCol from "@govuk-react/grid-col";
import Breadcrumbs from "@govuk-react/breadcrumbs";

import styled from "styled-components";
import { GetFundingApplicationQuery } from "../../API";

import LoadingBox from "@govuk-react/loading-box";

import { friendlyDate } from "../../lib/dateandtime";

interface Props extends RouteComponentProps {
    application: GetFundingApplicationQuery | undefined;
}

export const ApplicationSummary = styled.div`
    font-family: ${NTA_LIGHT};
    text-align: center;
    background-color: ${GREY_4};
    padding: 20px 40px;
    margin-bottom: 40px;
`;

export const Application: FC<Props> = props => {
    const application =
        props.application && props.application.getFundingApplication;

    if (!application) {
        return null;
    }

    const closeDate: string | null = friendlyDate(application.closeDate);

    return (
        <>
            <Breadcrumbs>
                <Breadcrumbs.Link href={`/`}>Back</Breadcrumbs.Link>
            </Breadcrumbs>

            <LoadingBox loading={!application}>
                <Caption mb={1}>{application.opportunityName} </Caption>
                <Title mb={5}>Application form</Title>

                <ApplicationSummary key={application.id}>
                    <GridRow>
                        <GridCol setWidth="33%">
                            <GridRow>
                                <Label mb={1}>Application number:</Label>
                            </GridRow>
                            <GridRow mb={5}>{application.id}</GridRow>

                            <GridRow>
                                <Label mb={1}>Opportunity:</Label>
                            </GridRow>
                            <GridRow>
                                {application.opportunityDescription}
                            </GridRow>
                        </GridCol>
                        <GridCol setWidth="33%">
                            <GridRow>
                                <Label mb={1}>Funding body:</Label>
                            </GridRow>
                            <GridRow mb={5}>
                                {application.opportunityFunders &&
                                    !!application.opportunityFunders.length &&
                                    application.opportunityFunders.join(", ")}
                            </GridRow>
                            <GridRow>
                                <Label mb={1}>Application deadline: </Label>
                            </GridRow>
                            <GridRow>{closeDate}</GridRow>
                        </GridCol>
                    </GridRow>
                </ApplicationSummary>

                <H3 mb={1}> Application questions </H3>
                <Caption size="M" mb={3}>
                    These are the questions that will be assessed
                </Caption>

                <Table>
                    {application.fundingApplicationQuestions &&
                        application.fundingApplicationQuestions.items &&
                        application.fundingApplicationQuestions.items.map(
                            question => {
                                if (!question) {
                                    return null;
                                }

                                return (
                                    <Table.Row key={question.id}>
                                        <Table.Cell setWidth="90%">
                                            <Link
                                                as={RouterLink}
                                                to={`/question/${question.id}`}
                                            >
                                                {question.heading}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {question.complete
                                                ? "Complete"
                                                : "Incomplete"}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }
                        )}
                </Table>
            </LoadingBox>
        </>
    );
};

export default Application;
