import { format, subDays, isWeekend } from "date-fns";
import { ChartDataPoint, DashboardStats } from "../types/dashboard";
import { getPersianDayName, formatToPersianDate } from "./persianCalendar";

export const generateMockChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];

  // تولید داده برای ۳۰ روز گذشته
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayName = getPersianDayName(date);
    const dateString = format(date, "yyyy-MM-dd");
    const persianDate = formatToPersianDate(date);

    // کاهش فعالیت در آخر هفته
    const isWeekendDay = isWeekend(date);
    const weekendMultiplier = isWeekendDay ? 0.4 : 1;

    const baseAdded = Math.floor(Math.random() * 15) + 5;
    const added =
      Math.floor(baseAdded * weekendMultiplier) + Math.floor(i * 0.1);
    const deleted = Math.floor(Math.random() * 8) + 0;
    const fileSize = Math.floor(Math.random() * 40) + 15;

    data.push({
      date: dateString,
      day: dayName,
      persianDate: persianDate,
      added,
      deleted,
      fileSize,
    });
  }
  return data;
};

export const generateMockStats = (
  chartData: ChartDataPoint[]
): DashboardStats => {
  const today = format(new Date(), "yyyy-MM-dd");
  const todayData = chartData.find((d) => d.date === today);

  // محاسبه مجموع آمار از تمام روزها
  const totalAdded = chartData.reduce((sum, d) => sum + d.added, 0);
  const totalDeleted = chartData.reduce((sum, d) => sum + d.deleted, 0);
  const totalFileSize = chartData.reduce((sum, d) => sum + d.fileSize, 0);

  return {
    totalPosts: totalAdded - totalDeleted + 245, // عدد پایه برای کل پست‌ها
    addedPosts: totalAdded,
    deletedPosts: totalDeleted,
    todayAdded: todayData?.added || 0,
    todayDeleted: todayData?.deleted || 0,
    fileUploadSize: totalFileSize,
  };
};

export const fetchDashboardData = async (): Promise<{
  chartData: ChartDataPoint[];
  stats: DashboardStats;
}> => {
  // شبیه‌سازی تاخیر شبکه
  await new Promise((resolve) => setTimeout(resolve, 500));

  const chartData = generateMockChartData();
  const stats = generateMockStats(chartData);

  return { chartData, stats };
};
