export interface DashboardStats {
  totalPosts: number;
  addedPosts: number;
  deletedPosts: number;
  todayAdded: number;
  todayDeleted: number;
  fileUploadSize: number;
}

export interface ChartDataPoint {
  date: string;
  persianDate: string;
  added: number;
  deleted: number;
  fileSize: number;
  day: string;
}

export interface TooltipData {
  date: string;
  added: number;
  deleted: number;
  fileSize: string;
}
