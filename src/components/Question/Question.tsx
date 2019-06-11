import React, {
    FC,
    useCallback,
    useState,
    SyntheticEvent,
    FormEvent
} from "react";

import Breadcrumbs from "@govuk-react/breadcrumbs";

import { Title, ukriGreen } from "ukripoc-components";

import Details from "@govuk-react/details";
import Caption from "@govuk-react/caption";
import LoadingBox from "@govuk-react/loading-box";
import Checkbox from "@govuk-react/checkbox";

import TextArea from "@govuk-react/text-area";

import { useFormState } from "react-use-form-state";

import { NTA_LIGHT } from "@govuk-react/constants";
import { GREY_3 } from "govuk-colours";

import styled from "styled-components";
import FormGroup from "@govuk-react/form-group";
import Button from "@govuk-react/button";
import { RouteComponentProps } from "@reach/router";
import { GetFundingApplicationQuestionQuery } from "../../API";

import ErrorText from "@govuk-react/error-text";

export const MarkAsComplete = styled.div`
    font-family: ${NTA_LIGHT};
    background-color: ${GREY_3};
    padding: 10px;
    margin-bottom: 20px;
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

    question: GetFundingApplicationQuestionQuery;
}
export const Question: FC<Props> = ({
    question,
    updateFundingApplicationQuestion
}) => {
    const initialState = {
        complete: false,
        applicationCase: ""
    };

    const q = question.getFundingApplicationQuestion;

    const [questionForm, setQuestionForm] = useState(initialState);

    const [validForm, setValidForm] = useState<boolean>(true);

    const wordLimit = (q && q.wordLimit) || 0;

    const [wordsRemaining, setWordsRemaining] = useState(wordLimit);

    const [formState, { textarea }] = useFormState(initialState);

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

    if (!q) {
        return <div> Loading... </div>;
    }

    const onChecked = (event: SyntheticEvent<HTMLInputElement>) => {
        setQuestionForm({
            ...questionForm,
            [event.currentTarget.name]: event.currentTarget.checked
        });
    };

    function onInputChange(event: string) {
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
    }

    return (
        <>
            <Breadcrumbs>
                <Breadcrumbs.Link href={`/`}>Back</Breadcrumbs.Link>
            </Breadcrumbs>

            <LoadingBox loading={false}>
                <Caption mb={1}>ji </Caption>
                <Title mb={7}>Case for support</Title>

                <Caption size="M" mb={1}>
                    Provide your case for support
                </Caption>
                <Details
                    mb={3}
                    summary="What should I include in case for support section?"
                >
                    ...
                </Details>
                <form onSubmit={onSubmit}>
                    <FormGroup error={!validForm}>
                        {!validForm && (
                            <ErrorText>
                                {" "}
                                Please ensure the text is within the word limit{" "}
                            </ErrorText>
                        )}
                        <TextArea
                            {...textarea({
                                name: "applicationCase",
                                validate: onInputChange
                            })}
                        />
                    </FormGroup>

                    <div>Words remaining: {wordsRemaining}</div>

                    <MarkAsComplete>
                        <Checkbox
                            name="complete"
                            defaultChecked={questionForm.complete}
                            onChange={onChecked}
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
