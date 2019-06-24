import React, { FC, useCallback, useState, FormEvent } from "react";

import { useFormState } from "react-use-form-state";
import { RouteComponentProps } from "@reach/router";
import { GetFundingApplicationQuestionQuery } from "../../API";

import { Title, ukriGreen } from "ukripoc-components";

import Breadcrumbs from "@govuk-react/breadcrumbs";
import Details from "@govuk-react/details";
import Caption from "@govuk-react/caption";
import LoadingBox from "@govuk-react/loading-box";
import Checkbox from "@govuk-react/checkbox";
import TextArea from "@govuk-react/text-area";
import FormGroup from "@govuk-react/form-group";
import Button from "@govuk-react/button";
import { NTA_LIGHT } from "@govuk-react/constants";
import ErrorText from "@govuk-react/error-text";
import { GREY_3 } from "govuk-colours";

import styled from "styled-components";

export const MarkAsComplete = styled.div`
    font-family: ${NTA_LIGHT};
    background-color: ${GREY_3};
    padding: 10px 10px 2px 20px;
    margin: 20px 0;
`;

export const WordCounter = styled.span`
    display: block;
    font-family: ${NTA_LIGHT};
    margin-bottom: 25px;
`;

interface Form {
    applicationCase: string;
    complete: boolean;
}

interface Props extends RouteComponentProps {
    updateFundingApplicationQuestion: (
        applicationCase: string,
        complete: boolean
    ) => void;

    question: GetFundingApplicationQuestionQuery | undefined;
}
export const Question: FC<Props> = ({
    question,
    updateFundingApplicationQuestion
}) => {
    const q = question && question.getFundingApplicationQuestion;

    const defaultAnswer = (q && q.answer) || "";

    const [listingDescription, setlistingDescription] = useState(defaultAnswer);

    const isComplete = (q && q.complete) || false;

    const initialState = {
        complete: isComplete,
        applicationCase: defaultAnswer
    };

    const [questionForm, setQuestionForm] = useState(initialState);

    const [validForm, setValidForm] = useState<boolean>(true);

    const wordLimit = (q && q.wordLimit) || 100;

    const [wordsRemaining, setWordsRemaining] = useState(
        wordLimit - listingDescription.length
    );

    const [formState, { textarea, checkbox }] = useFormState(initialState);

    const onInputChange = useCallback(
        async event => {
            setlistingDescription(event.target.value);

            if (event.target.value.length <= wordLimit) {
                const newWordsRemaining = wordLimit - event.target.value.length;

                setWordsRemaining(newWordsRemaining);
                setQuestionForm({
                    ...questionForm,
                    applicationCase: event.target.value
                });
                setValidForm(true);
            } else {
                const newWordsRemaining = wordLimit - event.target.value.length;
                setWordsRemaining(newWordsRemaining);
                setValidForm(false);
                return "Invalid";
            }
        },
        [questionForm, wordLimit]
    );

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();

            updateFundingApplicationQuestion(
                formState.values.applicationCase,
                formState.values.complete
            );
        },
        [
            formState.values.applicationCase,
            formState.values.complete,
            updateFundingApplicationQuestion
        ]
    );

    const applicationId =
        (q && q.fundingApplication && q.fundingApplication.id) || 0;

    return (
        <>
            <Breadcrumbs>
                <Breadcrumbs.Link href={`/application/${applicationId}`}>
                    Back
                </Breadcrumbs.Link>
            </Breadcrumbs>

            <LoadingBox loading={false}>
                <Caption mb={1}>{q && q.heading}</Caption>
                <Title mb={7}>Case for support</Title>

                <Caption size="M" mb={1}>
                    Provide your case for support
                </Caption>
                <Details mb={3} summary="this section">
                    {q && q.notes}
                </Details>
                <form onSubmit={onSubmit}>
                    <FormGroup error={!validForm}>
                        {!validForm && (
                            <ErrorText>
                                Please ensure the text is within the word limit
                            </ErrorText>
                        )}

                        <TextArea
                            mb={3}
                            input={{
                                onChange: onInputChange,
                                value: defaultAnswer
                            }}
                            {...textarea({
                                name: "applicationCase"
                            })}
                        />
                    </FormGroup>

                    <WordCounter>Words remaining: {wordsRemaining}</WordCounter>

                    <MarkAsComplete>
                        <Checkbox
                            checked={isComplete}
                            {...checkbox({
                                name: "complete"
                            })}
                        >
                            Mark as complete
                        </Checkbox>
                    </MarkAsComplete>
                    <Button
                        buttonColour={ukriGreen}
                        type="submit"
                        disabled={validForm ? false : true}
                    >
                        Save and return
                    </Button>
                </form>
            </LoadingBox>
        </>
    );
};

export default Question;
