import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { PieChart as PieReChart, Pie, Cell } from "recharts";

interface PieChartProps {
  width?: number;
  height?: number;
  data: any[];
}

const PieChart = (props: PieChartProps) => {
  const { width = 243, height = 243, data, ...rest } = props;

  const COLORS = ["#404FCC", "#FFCD3E", "#FF6E3A"];

  return (
    <div>
      <PieReChart width={width} height={height}>
        <Pie
          data={data}
          cx={121.5}
          cy={121.5}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieReChart>
    </div>
  );
};

export default PieChart;
