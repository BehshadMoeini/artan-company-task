"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ChartDataPoint } from "../types/dashboard";

interface ChartComponentsProps {
  data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-purple-900 border border-purple-700 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium mb-2">{`تاریخ: ${
          data?.persianDate || label
        }`}</p>
        <p className="text-purple-200 text-sm mb-2">{`روز: ${data?.day}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const PostsLineChart: React.FC<ChartComponentsProps> = ({ data }) => {
  return (
    <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        پست‌های اضافه شده و حذف شده
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6366f1" opacity={0.3} />
          <XAxis dataKey="persianDate" stroke="#a78bfa" fontSize={12} />
          <YAxis stroke="#a78bfa" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="added"
            stroke="#10b981"
            strokeWidth={2}
            name="اضافه شده"
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#10b981" }}
          />
          <Line
            type="monotone"
            dataKey="deleted"
            stroke="#ef4444"
            strokeWidth={2}
            name="حذف شده"
            dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#ef4444" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FileUploadBarChart: React.FC<ChartComponentsProps> = ({
  data,
}) => {
  return (
    <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        حجم آپلود فایل (مگابایت)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6366f1" opacity={0.3} />
          <XAxis dataKey="persianDate" stroke="#a78bfa" fontSize={12} />
          <YAxis stroke="#a78bfa" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="fileSize"
            fill="#8b5cf6"
            name="حجم فایل (MB)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
