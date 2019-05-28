import React from "react";
import renderer from "react-test-renderer";
import { ChooseOrganisation } from "./index";

describe("ChooseOrganisation", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<ChooseOrganisation />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

