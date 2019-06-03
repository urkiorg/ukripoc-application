import React, { FC, HTMLAttributes } from "react";
import cx from "classnames";
import styles from "./ConfirmUser.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {

}

export const ConfirmUser: FC<Props> = ({ ...props }) => (
  <div {...props}>
    {props.children}
  </div>
);

export default ConfirmUser;
