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
    const { data } = useQuery<ListFundingApplicationsQuery>(GET_APPLICATIONS);

    return <ApplicationDashboard applications={data} />;
};

export default ApplicationDashboard;
