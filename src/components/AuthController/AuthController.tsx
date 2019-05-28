import React, { FC } from "react";
import { ApplyPage } from "../ApplyPage";

interface Props {
    loggedIn: boolean;
}

export const AuthController: FC<Props> = props => (
    <div>{props.loggedIn ? props.children : <ApplyPage />}</div>
);
