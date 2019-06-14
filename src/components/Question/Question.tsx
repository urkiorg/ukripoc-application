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
    const initialState = {
        complete: false,
        applicationCase: ""
    };

    const q = question && question.getFundingApplicationQuestion;

    const [questionForm, setQuestionForm] = useState(initialState);

    const [validForm, setValidForm] = useState<boolean>(true);

    const wordLimit = (q && q.wordLimit) || 0;

    const [wordsRemaining, setWordsRemaining] = useState(wordLimit);

    const [formState, { textarea, checkbox }] = useFormState(initialState);

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

    const onInputChange = useCallback(
        async (event: string) => {
            const textAreaValue = event;
            if (textAreaValue.length <= wordLimit) {
                const newWordsRemaining = wordLimit - event.length;
                setWordsRemaining(newWordsRemaining);
                setQuestionForm({
                    ...questionForm,
                    applicationCase: textAreaValue
                });
                setValidForm(true);
            } else {
                const newWordsRemaining = wordLimit - event.length;
                setWordsRemaining(newWordsRemaining);
                setValidForm(false);
                return "Invalid";
            }
        },
        [questionForm, wordLimit]
    );

    return (
        <>
            <Breadcrumbs>
                <Breadcrumbs.Link href={`/`}>Back</Breadcrumbs.Link>
            </Breadcrumbs>

            <LoadingBox loading={false}>
                <Caption mb={1}>{q && q.heading}</Caption>
                <Title mb={7}>Case for support</Title>

                <Caption size="M" mb={1}>
                    Provide your case for support
                </Caption>
                <Details
                    mb={3}
                    summary="What should I include in case for support section?"
                >
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
                            {...textarea({
                                name: "applicationCase",
                                validate: onInputChange
                            })}
                        />
                    </FormGroup>

                    <WordCounter>Words remaining: {wordsRemaining}</WordCounter>

                    <MarkAsComplete>
                        <Checkbox
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
