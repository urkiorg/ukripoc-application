import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { ApplicationDashboard } from "../ApplicationDashboard";
import { GetFundingApplicationQuery } from "../../API";
import { getFundingApplication } from "../../graphql/queries";
import { useQuery } from "react-apollo-hooks";

interface Props extends RouteComponentProps {}

const GET_APPLICATION = gql(getFundingApplication);

export const ApplicationDashboardPage: FC<Props> = props => {
    const application = {
        id: 1,
        name: "two",
        description: "three",
        number: 400,
        closeDate: new Date("June 08, 2019 12:10:00").toISOString(),
        Opportunity: {
            name: "This will do"
        }
    };

    const applications = [
        application,
        { ...application, id: 3, name: "another one" },
        {
            ...application,
            id: 4,
            name: "what",
            closeDate: new Date("July 18, 2019 23:24:00").toISOString()
        },
        {
            ...application,
            id: 6,
            name: "Hello",
            closeDate: new Date("June 8, 2019 23:24:00").toISOString()
        }
    ];

    const { data } = useQuery<GetFundingApplicationQuery>(GET_APPLICATION);

    //TODO replace applications with data when we no longer need to mock
    console.log(data);

    return <ApplicationDashboard applications={applications} />;
};

export default ApplicationDashboard;
