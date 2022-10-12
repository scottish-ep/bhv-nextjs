import React from "react";
import {
  Checkbox as CheckboxAntd,
  CheckboxProps as CheckboxAntdProps,
} from "antd";

interface CheckboxProps extends CheckboxAntdProps {
  options: any[];
  disabled?: boolean;
  defaultValue?: any[];
  onChange?: (value?: any) => void;
}

const CheckboxList = (props: CheckboxProps) => {
  const { options, disabled, defaultValue, onChange } = props;

  return (
    <CheckboxAntd.Group
      options={options}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
};

export default CheckboxList;
