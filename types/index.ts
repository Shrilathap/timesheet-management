export type SortField = "week" | "date" | "status";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

// Local table-ready data
export interface TimesheetData {
  id: string;
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  action: string;
  year: number;
  weekStartDate: string;
  [key: string]: unknown;
}


export interface TimesheetFilters {
  page: number;
  limit: number;
  status?: string;
  dateRange?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}