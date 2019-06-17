import React from "react";
import { storiesOf } from "@storybook/react";
import { ApplicationDashboard } from "./index";

storiesOf("Components|ApplicationDashboard", module).add("Default", () => (
    <ApplicationDashboard
        loading={false}
        error={undefined}
        applications={undefined}
    />
));
