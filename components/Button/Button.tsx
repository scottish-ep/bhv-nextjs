import React, { ReactNode } from "react";
import { Button as ButtonAntd, ButtonProps as ButtonAntdProps } from "antd";
import classNames from "classnames";

interface ButtonProps extends ButtonAntdProps {
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
  suffixIcon?: ReactNode;
  variant?:
    | "primary"
    | "outlined"
    | "no-outlined"
    | "danger-outlined"
    | "danger"
    | "secondary"
    | "purple-filled"
    | "neural_200";
  text?: string;
}

const Button = (props: ButtonProps) => {
  const { width, height, children, suffixIcon, variant, text, style, ...rest } =
    props;

  return (
    <ButtonAntd
      className={classNames(variant)}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...rest}
    >
      {children || text}
      {suffixIcon && suffixIcon}
    </ButtonAntd>
  );
};

export default Button;
