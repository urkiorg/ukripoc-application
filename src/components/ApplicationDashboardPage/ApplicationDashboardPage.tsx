import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { ApplicationDashboard } from "../ApplicationDashboard";
import { GetFundingApplicationQuery } from "../../API";
import { getFundingApplication } from "../../graphql/queries";
import { useQuery } from "react-apollo-hooks";

interface Props extends RouteComponentProps {}

const GET_APPLICATION = gql(getFundingApplication);

export const ApplicationDashboardPage: FC<Props> = (props) => {

    // Get opportunity with application details
    // Put info into database using the format of the schema below:
    // https://github.com/urkiorg/ukripoc-application/blob/develop/amplify/backend/api/application/schema.graphql
    // Get all user applications

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        // Retrieve opportunity id from local storage
        const opportunityId = window.localStorage.getItem("opportunityId");
        
        // Get new opportunity
        if (opportunityId) {

            // temp
            setApplications([]);
            setError(false)
            setLoading(false);

            // Get opportunity with application details
            // On success remove opportunityId from local storage
            
            // then
            // Put info into database using the format of the schema below:
            // https://github.com/urkiorg/ukripoc-application/blob/develop/amplify/backend/api/application/schema.graphql

            // then
            // Clear localStorage
            window.localStorage.removeItem("opportunityId");
        }

        // Get all user applications

        // setLoading(true)
    }, []);

    // const application = {
    //     id: 1,
    //     name: "two",
    //     description: "three",
    //     number: 400,
    //     closeDate: new Date("June 08, 2019 12:10:00").toISOString(),
    //     Opportunity: {
    //         name: "This will do"
    //     }
    // };

    // const applications = [
    //     application,
    //     { ...application, id: 3, name: "another one" },
    //     {
    //         ...application,
    //         id: 4,
    //         name: "what",
    //         closeDate: new Date("July 18, 2019 23:24:00").toISOString()
    //     },
    //     {
    //         ...application,
    //         id: 6,
    //         name: "Hello",
    //         closeDate: new Date("June 8, 2019 23:24:00").toISOString()
    //     }
    // ];

    const { data } = useQuery<GetFundingApplicationQuery>(GET_APPLICATION);

    //TODO replace applications with data when we no longer need to mock
    console.log(data);

    return <ApplicationDashboard
        error={error}
        loading={loading}
        applications={applications} />;
};

export default ApplicationDashboard;
