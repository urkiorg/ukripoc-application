import React from "react";
import { storiesOf } from "@storybook/react";
import { ChooseOrganisation } from "./index";

storiesOf("Components|ChooseOrganisation", module).add("Default", () => (
    <ChooseOrganisation onSetOrganisation={() => {}} />
));
