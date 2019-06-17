import React from "react";
import renderer from "react-test-renderer";
import { Application } from "./index";

import { GetFundingApplicationQuery } from "../../API";

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
describe("Application", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Application application={v} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
