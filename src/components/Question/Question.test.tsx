import React from "react";
import renderer from "react-test-renderer";
import { Question } from "./index";

describe("Question", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Question />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

