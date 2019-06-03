import React from "react";
import renderer from "react-test-renderer";
import { AuthWrapper } from "./index";

describe("AuthWrapper", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<AuthWrapper />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

