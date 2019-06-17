import React, { FC, useEffect, useCallback } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { ApplicationDashboard } from "../ApplicationDashboard";

import {
    ListFundingApplicationsQuery,
    CreateFundingApplicationMutation
} from "../../API";
import { listFundingApplications } from "../../graphql/queries";

import { useQuery } from "react-apollo-hooks";
import { createFundingApplication } from "../../graphql/mutations";
import { OpportunityWithApplication, FundingApplication } from "../../types";

interface Props extends RouteComponentProps {}

const UPDATE_USERS_APPLICATIONS = gql(createFundingApplication);

const GET_APPLICATIONS = gql(listFundingApplications);

const formatApplication = (
    opportunityWithApplication: OpportunityWithApplication
): FundingApplication => {
    const { name, description } = opportunityWithApplication;
    const { lowestRankedApplication } = opportunityWithApplication;
    const { id, openApplication, closeApplication } = lowestRankedApplication;

    // need dynamic opportunityFunders and number
    return {
        id,
        opportunityName: name,
        opportunityDescription: description,
        opportunityFunders: [],
        openDate: openApplication,
        closeDate: closeApplication,
        ownerName: "Owner"
    };
};

export const ApplicationDashboardPage: FC<Props> = props => {
    const { data, error, loading } = useQuery<ListFundingApplicationsQuery>(
        GET_APPLICATIONS
    );

    console.log(data);

    const putFundingApplication = useMutation<CreateFundingApplicationMutation>(
        UPDATE_USERS_APPLICATIONS
    );

    const addApplicationToUser = useCallback(
        async (opportunityWithApplication: OpportunityWithApplication) => {
            return putFundingApplication({
                variables: {
                    input: formatApplication(opportunityWithApplication)
                }
            });
        },
        [putFundingApplication]
    );

    const getOpportunityWithApplication = async (opportunityId: string) => {
        try {
            // Update the hard coded url
            const response = await fetch(
                `https://develop.d3562686bv95v2.amplifyapp.com/opportunity/retrieve/${opportunityId}`
            );
            return response.json() || "";
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const getAndPutApplication = useCallback(
        async (opportunityId: string) => {
            // (async () => {
            try {
                const opportunityWithApplication = await getOpportunityWithApplication(
                    opportunityId
                );
                await addApplicationToUser(opportunityWithApplication);
                window.localStorage.removeItem("opportunityId");
            } catch (error) {
                console.log("error:", error);
            }
            // })();
        },
        [addApplicationToUser]
    );

    // const getUserApplications = useCallback(async () => {
    //     try {
    //         const applications = await userApplications;
    //         return applications;
    //     } catch (error) {
    //         setError(true);
    //     }
    // }, [userApplications]);

    useEffect(() => {
        const opportunityId = window.localStorage.getItem("opportunityId");

        if (opportunityId) {
            getAndPutApplication(opportunityId);
        }
    }, [getAndPutApplication]);

    return (
        <ApplicationDashboard
            error={error}
            loading={loading}
            applications={
                data &&
                data.listFundingApplications &&
                data.listFundingApplications.items
            }
        />
    );
};

export default ApplicationDashboard;
