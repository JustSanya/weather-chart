import React from "react";
import { useSelector } from 'react-redux'
import {selectResult, selectErrorMsg} from '../../redux/modules/search' 
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function Chart() {
  const chartData = useSelector(selectResult)
  const errorMsg = useSelector(selectErrorMsg)

  const renderCustomAxisTick = ({ x, y, payload }) => {
    const options = { day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" };
    const formatDate = new Intl.DateTimeFormat("ru-RU", options).format(
      new Date(payload.value)
    );
    return (
      <text
        x={x}
        y={y + 20}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >{`${formatDate}`}</text>
    );
  };

  return chartData.length ? (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart width={600} height={400} data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="dt_txt" tick={renderCustomAxisTick} />
        <YAxis />
        <Area
          type="monotone"
          dataKey="main.temp"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#temp)"
        />
      </AreaChart>
    </ResponsiveContainer>
  ) : (
    <div>{ errorMsg || 'Use the form above to search get a forecast' }</div>
  );
}
