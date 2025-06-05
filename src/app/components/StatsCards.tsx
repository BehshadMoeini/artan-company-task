"use client";
import React from "react";
import { TrendingUp, TrendingDown, FileText, Upload } from "lucide-react";
import { DashboardStats } from "../types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "کل پست‌ها",
      value: stats.totalPosts.toLocaleString(),
      change: "+12.5%",
      changeType: "increase" as const,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "پست‌های اضافه شده",
      value: stats.addedPosts.toLocaleString(),
      change: `+${stats.todayAdded} امروز`,
      changeType: "increase" as const,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "پست‌های حذف شده",
      value: stats.deletedPosts.toLocaleString(),
      change: `${stats.todayDeleted} امروز`,
      changeType: "decrease" as const,
      icon: TrendingDown,
      color: "bg-red-500",
    },
    {
      title: "حجم آپلود فایل",
      value: `${stats.fileUploadSize.toLocaleString()} MB`,
      change: "+8.2%",
      changeType: "increase" as const,
      icon: Upload,
      color: "bg-purple-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-purple-900/30 border border-purple-700 rounded-lg p-6 hover:bg-purple-900/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center text-sm ${
                  card.changeType === "increase"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {card.changeType === "increase" ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}{" "}
                {card.change}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {card.value}
              </h3>
              <p className="text-purple-300 text-sm">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
