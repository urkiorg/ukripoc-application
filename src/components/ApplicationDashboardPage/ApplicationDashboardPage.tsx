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

const formatApplication = (opportunityWithApplication: any) => {
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
        fundingApplicationQuestions: questions || [],
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
    const userApplications = useQuery<GetFundingApplicationQuery>(
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

    const getOpportunityWithApplication = async (opportunityId: string) => {
        try {
            let response = await fetch(
                `/opportunity-listing/retrieve/${opportunityId}`
            );
            return response.json() || "";
        } catch (error) {
            console.log("error");
        }
    };

    const getAndPutApplication = useCallback(
        (opportunityId: string) => {
            (async () => {
                try {
                    const opportunityWithApplication = await getOpportunityWithApplication(
                        opportunityId
                    );
                    await addApplicationToUser(opportunityWithApplication);
                    window.localStorage.removeItem("opportunityId");
                } catch (error) {
                    console.log("error");
                }
            })();
        },
        [addApplicationToUser]
    );

    const getUserApplications = useCallback(async () => {
        try {
            await userApplications;
        } catch (error) {
            setError(true);
        }
    }, [userApplications]);

    useEffect(() => {
        const opportunityId = window.localStorage.getItem("opportunityId");
        setLoading(true);

        if (opportunityId) {
            getAndPutApplication(opportunityId);
        }

        if (getUserApplications()) {
            // @ts-ignore
            setApplications(getUserApplications);
        }

        setLoading(false);

        // Only want this to run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ApplicationDashboard
            error={error}
            loading={loading}
            applications={applications}
        />
    );
};

export default ApplicationDashboard;
