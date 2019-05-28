import React from "react";
import renderer from "react-test-renderer";
import { ApplyPage } from "./index";

describe("ApplyPage", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<ApplyPage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

