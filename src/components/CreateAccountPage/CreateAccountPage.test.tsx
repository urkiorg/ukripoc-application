import React from "react";
import renderer from "react-test-renderer";
import { CreateAccountPage } from "./index";

describe("CreateAccountPage", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<CreateAccountPage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

