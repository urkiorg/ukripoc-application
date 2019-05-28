import React from "react";
import renderer from "react-test-renderer";
import { MaybeAccount } from "./index";

describe("MaybeAccount", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<MaybeAccount />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

