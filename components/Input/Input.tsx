import React from "react";
import { Input as InputAntd, InputProps as InputAntdProps } from "antd";
import classNames from "classnames";

interface InputProps extends InputAntdProps {
  width?: number | string;
  label?: string;
  className?: string;
}

const Input = (props: InputProps) => {
  const { width, label, className, ...rest } = props;

  return (
    <div className={classNames("flex flex-col", className)}>
      {label && (
        <div className="font-medium text-medium mb-[12px]">{label}</div>
      )}
      <InputAntd
        style={{
          width: width,
        }}
        {...rest}
      />
    </div>
  );
};

export default Input;
