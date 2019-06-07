import React from "react";
import renderer from "react-test-renderer";
import { ApplicationDashboard } from "./index";

describe("ApplicationDashboard", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<ApplicationDashboard applications={() => ""} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
