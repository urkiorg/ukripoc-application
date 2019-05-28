import React from "react";
import renderer from "react-test-renderer";
import { AccountDetails } from "./index";

describe("AccountDetails", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<AccountDetails />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

