import React from "react";
import renderer from "react-test-renderer";
import { AccountDetails } from "./index";

describe("AccountDetails", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <AccountDetails organisation={{ ID: "foo", Name: "bar" }} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
