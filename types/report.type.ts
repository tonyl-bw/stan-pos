// Sales report model
interface SalesReport {
  PK: string; // REPORT#SALES#{dateRange}
  SK: string; // METADATA
  reportId: string;
  dateRange: {
    startDate: string; // ISO date
    endDate: string; // ISO date
  };
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingProducts: {
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  salesByCategory: {
    category: string;
    revenue: number;
    percentage: number;
  }[];
  salesByDeliveryMethod: {
    method: string;
    orders: number;
    revenue: number;
  }[];
  salesByHour: {
    hour: number;
    orders: number;
    revenue: number;
  }[];
  generatedAt: string; // ISO date
  generatedBy: string; // userId
}