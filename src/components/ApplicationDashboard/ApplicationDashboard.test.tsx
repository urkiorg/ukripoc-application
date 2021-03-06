import * as React from "react";
import renderer from "react-test-renderer";
import { ApplicationDashboard } from "./index";

describe("ApplicationDashboard", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <ApplicationDashboard
                    loading={false}
                    error={undefined}
                    applications={[]}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
