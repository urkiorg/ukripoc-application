import React from "react";
import { storiesOf } from "@storybook/react";
import { AccountDetails } from "./index";

storiesOf("Components|AccountDetails", module).add("Default", () => (
    <AccountDetails organisation={0} />
));
