import React from "react";
import renderer from "react-test-renderer";
import { ConfirmSignUp } from "./index";

describe("ConfirmSignUp", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<ConfirmSignUp />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

