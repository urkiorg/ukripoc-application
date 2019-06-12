import React, { FC, useCallback } from "react";

import { RouteComponentProps, navigate } from "@reach/router";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

import {
    GetFundingApplicationQuestionQuery,
    UpdateFundingApplicationQuestionMutation
} from "../../API";
import { getFundingApplicationQuestion } from "../../graphql/queries";
import { updateFundingApplicationQuestion } from "../../graphql/mutations";
import Question from "../Question/Question";

interface Props extends RouteComponentProps {
    id?: string;
}

const GET_APPLICATION_QUESTION = gql(getFundingApplicationQuestion);

const UPDATE_APPLICATION_QUESTION = gql(updateFundingApplicationQuestion);

export const QuestionPage: FC<Props> = props => {
    const updateFundingApplicationQuestionMutation = useMutation<
        UpdateFundingApplicationQuestionMutation
    >(UPDATE_APPLICATION_QUESTION);

    const { data } = useQuery<GetFundingApplicationQuestionQuery>(
        GET_APPLICATION_QUESTION,
        {
            variables: {
                id: props.id
            },
            fetchPolicy: "cache-first"
        }
    );

    console.log(data);

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

    const updateFundingApplicationQuestion = useCallback(
        async (applicationCase: string, completed: boolean) => {
            const result = await updateFundingApplicationQuestionMutation({
                variables: {
                    input: {
                        id: props.id,
                        answer: applicationCase,
                        complete: completed
                    }
                }
            });

            const { data } = result;

            if (data) {
                navigate(`/setup/${data.updateWebsiteListing.opportunity.id}`);
            }
        },
        [updateFundingApplicationQuestionMutation, props.id]
    );

    //todo replace with data when we dont need to mock
    return (
        <Question
            question={v}
            updateFundingApplicationQuestion={updateFundingApplicationQuestion}
        />
    );
};

export default QuestionPage;
