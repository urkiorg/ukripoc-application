import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {}

export const ApplicationDashboard: FC<Props> = props => {
    console.log(props);
    return <div>Dashboard</div>;
};

export default ApplicationDashboard;
