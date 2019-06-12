import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { ApplicationDashboard } from "../ApplicationDashboard";

import { ListFundingApplicationsQuery } from "../../API";
import { listFundingApplications } from "../../graphql/queries";

import { useQuery } from "react-apollo-hooks";

interface Props extends RouteComponentProps {}

const GET_APPLICATIONS = gql(listFundingApplications);

export const ApplicationDashboardPage: FC<Props> = props => {
    //TODO WILL BE REMOVED ONCE NO MORE MOCKING

    const fakeResponse: ListFundingApplicationsQuery = {
        listFundingApplications: {
            __typename: "ModelFundingApplicationConnection",
            items: [
                {
                    __typename: "FundingApplication",
                    id: "string",
                    owner: "string",
                    ownerName: "string",
                    opportunityName: "string",
                    opportunityDescription: "string",
                    opportunityFunders: ["one", "two"],
                    openDate: "string",
                    closeDate: new Date("June 08, 2019 12:10:00").toISOString(),
                    fundingApplicationQuestions: null
                }
            ],
            nextToken: "string"
        }
    };

    console.log(fakeResponse);
    //END TODO REMOVE

    const { data } = useQuery<ListFundingApplicationsQuery>(GET_APPLICATIONS);

    console.log(data);

    return <ApplicationDashboard applications={fakeResponse} />;
};

export default ApplicationDashboard;
