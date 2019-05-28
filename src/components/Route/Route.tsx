import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";

type Props = { component: FC } & RouteComponentProps;

export const Route: FC<Props> = ({ component: Component, ...rest }) => (
    <Component {...rest} />
);
