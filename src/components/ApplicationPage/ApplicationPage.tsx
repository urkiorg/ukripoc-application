import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Application } from "../Application";
import { GetFundingApplicationQuery } from "../../API";

import { getFundingApplication } from "../../graphql/queries";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

interface Props extends RouteComponentProps {}

const GET_APPLICATION = gql(getFundingApplication);

const v: GetFundingApplicationQuery = {
    getFundingApplication: {
        __typename: "FundingApplication",
        id: "string",
        owner: "string",
        ownerName: "string",
        opportunityName: "string",
        opportunityDescription: "string",
        opportunityFunders: [],
        openDate: "string",
        closeDate: "string",
        fundingApplicationQuestions: {
            __typename: "ModelFundingApplicationQuestionConnection",
            items: [
                {
                    __typename: "FundingApplicationQuestion",
                    id: "string",
                    owner: "string",
                    heading: "string",
                    title: "string",
                    subtitle: "string",
                    notes: "string",
                    wordLimit: 100,
                    answer: "string",
                    complete: false
                },
                {
                    __typename: "FundingApplicationQuestion",
                    id: "sdksodk",
                    owner: "string",
                    heading: "Heading",
                    title: "Title",
                    subtitle: "Subtitle",
                    notes: "Notes...",
                    wordLimit: 100,
                    answer: "string",
                    complete: false
                }
            ],
            nextToken: "string"
        }
    }
};

export const ApplicationPage: FC<Props> = props => {
    const { data } = useQuery<GetFundingApplicationQuery>(GET_APPLICATION);

    console.log(data);

    return <Application application={v} />;
};

export default ApplicationPage;
