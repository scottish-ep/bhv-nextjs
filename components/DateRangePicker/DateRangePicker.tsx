import React from "react";
import {
  DatePicker as DatePickerAntd,
  Space,
  TimeRangePickerProps as RangePickerAntdProps,
} from "antd";
import moment from "moment";

const { RangePicker } = DatePickerAntd;

interface RangePickerProps extends RangePickerAntdProps {
  width: number | string;
}

const DatePicker = (props: RangePickerProps) => {
  const { width } = props;

  return (
    <RangePicker
      style={{ width: width }}
      // ranges={{
      //   Today: [moment(), moment()],
      //   "This Month": [moment().startOf("month"), moment().endOf("month")],
      // }}
      {...props}
    />
  );
};

export default DatePicker;
