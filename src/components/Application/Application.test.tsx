import React from "react";
import renderer from "react-test-renderer";
import { Application } from "./index";

describe("Application", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<Application application={() => ""} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
