import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import {
  LineChart as LineReChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  width?: number | string;
  height?: number;
  data: any[];
}

const LineChart = (props: LineChartProps) => {
  const { width = 243, height = 400, data, ...rest } = props;

  return (
    <div className="w-full">
      <ResponsiveContainer width={width} height={height}>
        <LineReChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="a"
            stroke="#0EA5E9"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="b" stroke="#10B981" />
          <Line type="monotone" dataKey="c" stroke="#8B5CF6" />
        </LineReChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
