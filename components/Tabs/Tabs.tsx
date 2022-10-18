import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { StatusEnum, StatusList } from "../../types";

interface TabsProps {
  defaultTab?: string;
  countTotal?: number;
  tabs?: { name: StatusEnum; count: number }[];
  onChange?: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  defaultTab,
  countTotal = 0,
  tabs,
  onChange,
}) => {
  const [tabActive, setTabActive] = useState(defaultTab || "");

  useEffect(() => {
    onChange?.(tabActive);
  }, [tabActive, onChange]);

  return (
    <div className="flex">
      <div
        className={classNames(
          "flex gap-x-1 border border-b-0 border-[#F0F0F1] rounded-t px-3 py-[7px] font-medium text-[#1D1C2D] cursor-pointer",
          {
            "bg-white font-bold": tabActive === "",
          }
        )}
        onClick={() => setTabActive("")}
      >
        <span>Tất cả</span>
        <span>({countTotal})</span>
      </div>
      {tabs?.map((tab, index) => (
        <div
          key={index}
          className={classNames(
            "flex gap-x-1 border border-b-0 border-[#F0F0F1] rounded-t px-3 py-[7px] font-medium text-[#1D1C2D]  cursor-pointer",
            {
              "bg-white font-bold": tab.name === tabActive,
            }
          )}
          onClick={() => setTabActive(tab.name)}
        >
          <span>
            {StatusList.find((status) => status.value === tab.name)?.name}
          </span>
          <span>({tab.count})</span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
