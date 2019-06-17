import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Application } from "../Application";
import { GetFundingApplicationQuery } from "../../API";

import { getFundingApplication } from "../../graphql/queries";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

interface Props extends RouteComponentProps {
    id?: string;
}

const GET_APPLICATION = gql(getFundingApplication);

export const ApplicationPage: FC<Props> = ({ id }) => {
    const { data } = useQuery<GetFundingApplicationQuery>(GET_APPLICATION, {
        variables: { id }
    });

    return <Application application={data} />;
};

export default ApplicationPage;
