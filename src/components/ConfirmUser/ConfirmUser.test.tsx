import React from "react";
import renderer from "react-test-renderer";
import { ConfirmUser } from "./index";

describe("ConfirmUser", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<ConfirmUser />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

