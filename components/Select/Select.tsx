import React from "react";
import { ReactNode } from "react";
import { Select as SelectAntd, SelectProps as SelectAntdProps } from "antd";
import Icon from "../Icon/Icon";

import styles from "./Select.module.css";
import classNames from "classnames";

interface SelectProps extends SelectAntdProps {
  width?: number | string;
  label?: string;
  prefix?: ReactNode;
}

const Select = (props: SelectProps) => {
  const { width, label, prefix } = props;

  return (
    <div
      className={classNames(
        "flex flex-col relative",
        prefix && "has-prefix-icon"
      )}
    >
      {label && (
        <div className="font-medium text-medium mb-[12px]">{label}</div>
      )}
      {prefix && <div className={styles.icon_prefix}>{prefix}</div>}
      <SelectAntd
        suffixIcon={<Icon icon="arrow-down-1" size={16} color="#909098" />}
        style={{
          width: width,
        }}
        {...props}
      />
    </div>
  );
};

export default Select;
