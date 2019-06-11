import React, { FC } from "react";

import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import { GetFundingApplicationQuestionQuery } from "../../API";
import { getFundingApplicationQuestion } from "../../graphql/queries";
import Question from "../Question/Question";

interface Props extends RouteComponentProps {
    id?: string;
}

const GET_APPLICATION_QUESTION = gql(getFundingApplicationQuestion);

export const QuestionPage: FC<Props> = props => {
    const { data } = useQuery<GetFundingApplicationQuestionQuery>(
        GET_APPLICATION_QUESTION,
        {
            variables: {
                id: props.id
            },
            fetchPolicy: "cache-first"
        }
    );

    const v: GetFundingApplicationQuestionQuery = {
        getFundingApplicationQuestion: {
            __typename: "FundingApplicationQuestion",
            id: "sdss",
            owner: "string",
            heading: "string",
            title: "string",
            subtitle: "string",
            notes: "string",
            wordLimit: 100,
            fundingApplication: {
                __typename: "FundingApplication",
                id: "string",
                owner: "string",
                ownerName: "string",
                opportunityName: "string",
                opportunityDescription: "string",
                opportunityFunders: ["no", "onw"],
                openDate: "string",
                closeDate: "string",
                fundingApplicationQuestions: {
                    __typename: "ModelFundingApplicationQuestionConnection",
                    nextToken: "string"
                }
            },
            answer: "string",
            complete: false
        }
    };

    console.log(data);

    function updateFundingApplicationQuestion(
        applicationCase: string,
        complete: boolean
    ) {
        console.log(applicationCase, complete);
    }

    //todo replace with data when we dont need to mock
    return (
        <Question
            question={v}
            updateFundingApplicationQuestion={updateFundingApplicationQuestion}
        />
    );
};

export default QuestionPage;
