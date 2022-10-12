import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import { isArray } from "../../utils/utils";
import Icon from "../Icon/Icon";
import { StatusColorEnum, StatusEnum } from "../../types";

interface DropdownStatusProps {
  children?: ReactNode;
  options?: {
    value: StatusEnum;
    label: string;
  }[];
  onChange?: (value: string | number) => void;
  icon?: string;
  text?: string;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onRemoveSelected?: () => void;
}

const DropdownStatus: React.FC<DropdownStatusProps> = (props) => {
  const {
    children,
    text,
    options,
    onChange,
    icon,
    defaultValue,
    disabled = false,
    onRemoveSelected,
  } = props;
  const [selected, setSelected] = useState(defaultValue || "");

  const handleChange = (value: string | number) => {
    if (value !== selected) {
      onChange?.(value);
      setSelected(value);
    }
  };

  return (
    <div
      className={classNames("relative", {
        group: !disabled,
      })}
    >
      <div
        className={classNames(
          "flex items-center gap-x-2 p-3 text-[#5F5E6B] cursor-pointer group-hover:text-[#FF970D] border !border-[#DADADD] group-hover:!border-[#FF970D] rounded bg-white",
          {
            "cursor-not-allowed": disabled,
          }
        )}
      >
        {icon && (
          <Icon icon={icon} size={24} className="group-hover:fill-[#FF970D]" />
        )}
        {children || text}
      </div>

      <div className="absolute top-full mt-[6px] w-full p-2 bg-white hidden group-hover:flex flex-col shadow-sm z-[2] rounded before:absolute before:bottom-full before:left-0 before:w-full before:h-[6px]">
        {isArray(options) &&
          options?.map((option) => (
            <div
              className={`font-semibold text-medium text-center cursor-pointer py-[6px] text-[${
                StatusColorEnum[option.value]
              }]`}
              key={option.value}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        <div
          className="flex justify-center items-center w-full cursor-pointer pt-3 gap-x-2 text-medium font-medium text-[#EF4444] border-t border-t-[#DADADD]"
          onClick={onRemoveSelected}
        >
          <Icon icon="trash" size={24} color="#EF4444" />
          Xoá phiếu
        </div>
      </div>
    </div>
  );
};

export default DropdownStatus;
