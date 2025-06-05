"use client";
import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { ChartDataPoint, DashboardStats } from "../types/dashboard";
import { fetchDashboardData } from "../utils/mockApi";
import { getCurrentPersianDate } from "../utils/persianCalendar";
import StatsCards from "../components/StatsCards";
import {
  PostsLineChart,
  FileUploadBarChart,
} from "../components/ChartComponents";
import { format } from "date-fns";

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await fetchDashboardData();
      setChartData(data.chartData);
      setStats(data.stats);
      setError(null);
    } catch (err) {
      setError("خطا در بارگذاری داده‌ها");
      console.error("خطا در بارگذاری داده‌های داشبورد:", err);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  // بارگذاری اولیه داده‌ها هنگام بارگذاری کامپوننت
  useEffect(() => {
    loadDashboardData();
  }, []);

  // نمایش حالت بارگذاری
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-purple-300 text-lg">
              در حال بارگذاری داشبورد...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // نمایش حالت خطا
  if (error || !stats) {
    return (
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className="text-center py-12">
          <div className="bg-red-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            خطا در بارگذاری داشبورد
          </h3>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  const today = format(new Date(), "yyyy-MM-dd");
  const todayData = chartData.find((d) => d.date === today);

  return (
    <div className="max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">داشبورد گزارشات</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => loadDashboardData(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-purple-800 hover:bg-purple-700 disabled:bg-purple-900 px-4 py-2 rounded-lg text-white font-medium transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "در حال به‌روزرسانی..." : "به‌روزرسانی"}
            </button>{" "}
            <div className="flex items-center text-purple-300">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{getCurrentPersianDate()}</span>
            </div>
          </div>
        </div>
        <p className="text-purple-300">آمار و گزارشات کلی سیستم مدیریت محتوا</p>
      </div>

      {/* بخش گزارش امروز - نمایش آمار روزانه */}
      <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2" />
          گزارش امروز
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {stats.todayAdded}
            </div>
            <div className="text-purple-300">پست اضافه شده</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {stats.todayDeleted}
            </div>
            <div className="text-purple-300">پست حذف شده</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {todayData?.fileSize || 0} MB
            </div>
            <div className="text-purple-300">حجم آپلود فایل</div>
          </div>{" "}
        </div>
      </div>

      {/* آمار کلی */}
      <StatsCards stats={stats} />

      {/* نمایش نمودار خطی و ستونی */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PostsLineChart data={chartData} />
        <FileUploadBarChart data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
