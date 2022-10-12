import React, { FunctionComponent } from "react";
import {
  DatePicker as DatePickerAntd,
  DatePickerProps as DatePickerAntdProps,
} from "antd";

interface DatePickerProps {
  width?: number | string;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { width, placeholder } = props;

  return (
    <DatePickerAntd
      placeholder={placeholder}
      style={{ width: width }}
      {...props}
    />
  );
};

export default DatePicker;
