import React, { FC, useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { ApplicationDashboard } from "../ApplicationDashboard";
import { GetFundingApplicationQuery } from "../../API";
import { getFundingApplication } from "../../graphql/queries";
import { useQuery } from "react-apollo-hooks";
import { CreateFundingApplicationMutation } from "../../API";
import { createFundingApplication } from "../../graphql/mutations";
import { OpportunityWithApplication } from "../../types";

interface Props extends RouteComponentProps {}

const GET_APPLICATION = gql(getFundingApplication);
const UPDATE_USERS_APPLICATIONS = gql(createFundingApplication);
const formatApplication = (
    opportunityWithApplication: OpportunityWithApplication
) => {
    const { name, description } = opportunityWithApplication;
    const { lowestRankedApplication } = opportunityWithApplication;
    const {
        id,
        openApplication,
        closeApplication,
        questions
    } = lowestRankedApplication;

    // need dynamic opportunityFunders and number
    return {
        id,
        opportunityName: name,
        opportunityDescription: description,
        opportunityFunders: "",
        openDate: openApplication,
        closeDate: closeApplication,
        fundingApplicationQuestions: questions,
        number: 0
    };
};

export const ApplicationDashboardPage: FC<Props> = props => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const putFundingApplication = useMutation<CreateFundingApplicationMutation>(
        UPDATE_USERS_APPLICATIONS
    );

    // What is the endpoint?
    const getApplications = useQuery<GetFundingApplicationQuery>(
        GET_APPLICATION
    ).data;

    const addApplicationToUser = useCallback(
        async (opportunityWithApplication: OpportunityWithApplication) => {
            await putFundingApplication({
                variables: {
                    input: formatApplication(opportunityWithApplication)
                }
            });
        },
        [putFundingApplication]
    );

    useEffect(() => {
        setLoading(true);
        // Retrieve opportunity id from local storage, if present
        const opportunityId = window.localStorage.getItem("opportunityId");

        if (opportunityId) {
            const opportunityWithApplication = async (
                opportunityId: string
            ) => {
                try {
                    // Hard code the full url
                    let response = await fetch(
                        `/opportunity-listing/retrieve/${opportunityId}`
                    );
                    setLoading(false);
                    setError(false);
                    return response.json();
                } catch (error) {
                    setLoading(false);
                    setError(true);
                }
            };

            // @ts-ignore
            addApplicationToUser(opportunityWithApplication(opportunityId));

            window.localStorage.removeItem("opportunityId");
        }

        if (getApplications) {
            // @ts-ignore
            setApplications(getApplications);
        }

        setLoading(false);
    }, [addApplicationToUser, getApplications]);

    return (
        <ApplicationDashboard
            error={error}
            loading={loading}
            applications={applications}
        />
    );
};

export default ApplicationDashboard;
