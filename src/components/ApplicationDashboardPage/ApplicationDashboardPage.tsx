import React, { FC, useEffect, useCallback, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { ApplicationDashboard } from "../ApplicationDashboard";

import {
    ListFundingApplicationsQuery,
    CreateFundingApplicationMutation,
    CreateFundingApplicationQuestionMutationVariables
} from "../../API";
import { listFundingApplications } from "../../graphql/queries";

import { useQuery } from "react-apollo-hooks";
import {
    createFundingApplication,
    createFundingApplicationQuestion
} from "../../graphql/mutations";
import { OpportunityWithApplication, FundingApplication } from "../../types";

interface Props extends RouteComponentProps {}

const UPDATE_USERS_APPLICATIONS = gql(createFundingApplication);
const UPDATE_USERS_QUESTIONS = gql(createFundingApplicationQuestion);

const GET_APPLICATIONS = gql(listFundingApplications);

const formatApplication = (
    opportunityWithApplication: OpportunityWithApplication
): FundingApplication => {
    const { name, description } = opportunityWithApplication;
    const { lowestRankedApplication } = opportunityWithApplication;
    const { openApplication, closeApplication } = lowestRankedApplication;

    // need dynamic opportunityFunders and number
    return {
        opportunityName: name,
        opportunityDescription: description,
        opportunityFunders: [],
        openDate: openApplication,
        closeDate: closeApplication,
        ownerName: "Owner"
    };
};

export const ApplicationDashboardPage: FC<Props> = props => {
    const putFundingApplication = useMutation<CreateFundingApplicationMutation>(
        UPDATE_USERS_APPLICATIONS
    );

    const putFundingApplicationQuestions = useMutation<
        CreateFundingApplicationQuestionMutationVariables
    >(UPDATE_USERS_QUESTIONS);

    const addApplicationToUser = useCallback(
        async (opportunityWithApplication: OpportunityWithApplication) => {
            console.log("ADDING APPLICATION TO USER....");

            const result = await putFundingApplication({
                variables: {
                    input: formatApplication(opportunityWithApplication)
                }
            });

            const { data } = result;

            console.log("ABOUT TO SET APPLICATIONS....");
            setApplications(data.createFundingApplication);

            return data.createFundingApplication.id;
        },
        [putFundingApplication]
    );

    const [applications, setApplications] = useState();

    interface QuestionT {
        id: string;
        owner: string;
        heading: string;
        title: string;
        subtitle: string;
        notes: string;
        wordLimit: number;
        fundingApplication: FundingApplication;
        answer: string;
        complete: boolean;
    }

    const addQuestionToUser = useCallback(
        async (opportunityWithApplication: any, applicationId: string) => {
            opportunityWithApplication.forEach(async (question: QuestionT) => {
                const v = await putFundingApplicationQuestions({
                    variables: {
                        input: {
                            heading: question.heading,
                            notes: question.notes,
                            subtitle: question.subtitle,
                            title: question.title,
                            wordLimit: question.wordLimit,
                            fundingApplicationQuestionFundingApplicationId: applicationId
                        }
                    }
                });

                return v;
            });
        },
        [putFundingApplicationQuestions]
    );

    const getOpportunityWithApplication = async (opportunityId: string) => {
        try {
            // Update the hard coded url
            const response = await fetch(
                `https://urujq4chp1.execute-api.eu-west-1.amazonaws.com/develop/opportunity/retrieve/${opportunityId}`,
                {
                    method: "get",
                    headers: {
                        "Access-Control-Request-Headers": "*",
                        "Access-Control-Request-Method": "*"
                    },
                    mode: "cors"
                }
            );

            return response.json() || "";
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const getAndPutApplication = useCallback(
        async (opportunityId: string) => {
            try {
                const opportunityWithApplication = await getOpportunityWithApplication(
                    opportunityId
                );

                const applicationId = await addApplicationToUser(
                    opportunityWithApplication
                );

                const questions =
                    opportunityWithApplication.lowestRankedApplication
                        .questions;

                addQuestionToUser(questions, applicationId);

                window.localStorage.removeItem("opportunityId");
            } catch (error) {
                console.log("error:", error);
            }
        },
        [addApplicationToUser, addQuestionToUser]
    );

    useEffect(() => {
        console.log("useEffect");
        const opportunityId = window.localStorage.getItem("opportunityId");
        if (opportunityId) {
            getAndPutApplication(opportunityId);
        }
    }, [getAndPutApplication]);

    const { data, error, loading } = useQuery<ListFundingApplicationsQuery>(
        GET_APPLICATIONS,
        { fetchPolicy: "network-only" }
    );

    return (
        <ApplicationDashboard
            error={error}
            loading={loading}
            applications={
                data &&
                data.listFundingApplications &&
                data.listFundingApplications.items
            }
            newApplication={applications}
        />
    );
};

export default ApplicationDashboard;
