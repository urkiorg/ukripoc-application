import React, { FC, useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { ApplicationDashboard } from "../ApplicationDashboard";
import { GetFundingApplicationQuery, CreateFundingApplicationMutation } from "../../API";
import { getFundingApplication } from "../../graphql/queries";
import { useQuery } from "react-apollo-hooks";
import { createFundingApplication } from "../../graphql/mutations";
import { OpportunityWithApplication, FundingApplication } from "../../types";


interface Props extends RouteComponentProps {}

const GET_APPLICATION = gql(getFundingApplication);
const UPDATE_USERS_APPLICATIONS = gql(createFundingApplication);

const formatApplication = (opportunityWithApplication: OpportunityWithApplication):FundingApplication => {
    const { name, description } = opportunityWithApplication;
    const { lowestRankedApplication } = opportunityWithApplication;
    const {
        id,
        openApplication,
        closeApplication,
    } = lowestRankedApplication;

    // need dynamic opportunityFunders and number
    return {
        id,
        opportunityName: name,
        opportunityDescription: description,
        opportunityFunders: [],
        openDate: openApplication,
        closeDate: closeApplication,
        ownerName: "Owner",
    };
};

export const ApplicationDashboardPage: FC<Props> = props => {
    const [applications, setApplications] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [applicationsReturned, setApplicationsReturned] = useState(false);

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
                `http://localhost:3000/opportunity/retrieve/${opportunityId}`
            );
            return response.json() || "";
        } catch (error) {
            console.log("error: ", error);
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
                    console.log("error:", error);
                }
            })();
        },
        [addApplicationToUser]
    );

    const getUserApplications = useCallback(async () => {
        try {
            const applications = await userApplications;
            return applications;
        } catch (error) {
            setError(true);
        }
    }, [userApplications]);

    useEffect(() => {
        if (!applicationsReturned) { 
            const opportunityId = window.localStorage.getItem("opportunityId");
            setLoading(true);

            if (opportunityId) {
                getAndPutApplication(opportunityId);
            }

            const userApplications = getUserApplications();
            if (userApplications) {
                setApplications(userApplications);
            }

            setApplicationsReturned(true);
            setLoading(false);
        }
    },[applicationsReturned, getAndPutApplication, getUserApplications]);

    return (
        <ApplicationDashboard
            error={error}
            loading={loading}
            applications={applications}
        />
    );
};

export default ApplicationDashboard;
