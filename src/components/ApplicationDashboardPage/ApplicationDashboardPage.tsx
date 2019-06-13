import React, { FC, useEffect, useState } from "react";
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
const formatApplication = (opportunityWithApplication: OpportunityWithApplication) => {
    const { name, description } = opportunityWithApplication;
    const { lowestRankedApplication } = opportunityWithApplication;
    const { id, openApplication, closeApplication, questions } = lowestRankedApplication;

    // need dynamic opportunityFunders and number
    return {
        id,
        opportunityName: name,
        opportunityDescription: description,
        opportunityFunders: "",
        openDate: openApplication,
        closeDate: closeApplication,
        fundingApplicationQuestions: questions,
        number: 0,
    }
}

const putFundingApplication = useMutation<
    CreateFundingApplicationMutation
    >(UPDATE_USERS_APPLICATIONS);

const addApplicationToUser = async (opportunityWithApplication: OpportunityWithApplication) => {
    const fundingApplications = formatApplication(opportunityWithApplication);
    await putFundingApplication({
        variables: {
            input: fundingApplications
        }
    });
}

// What is the endpoint?
const getApplications = useQuery<GetFundingApplicationQuery>(GET_APPLICATION).data;

export const ApplicationDashboardPage: FC<Props> = (props) => {

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect (() => {
        setLoading(true);
        // Retrieve opportunity id from local storage, if present
        const opportunityId = window.localStorage.getItem("opportunityId");
        
        if (opportunityId) {
            const opportunityWithApplication = async (opportunityId: string) => {
                let opportunityWithApplication
                try {
                    // Hard code the full url
                    opportunityWithApplication = await fetch(`/opportunity-listing/retrieve/${opportunityId}`)
                    setLoading(false);
                    setError(false);
                    return opportunityWithApplication;
                } catch(error) {
                    setLoading(false);
                    setError(true);
                }
            };
            
            addApplicationToUser(opportunityWithApplication(opportunityId));

            window.localStorage.removeItem("opportunityId");
        }

        if (getApplications) {
            setApplications(getApplications);
        }

        setLoading(false);
    }, []);

    return <ApplicationDashboard
        error={error}
        loading={loading}
        applications={applications} />;
};

export default ApplicationDashboard;
