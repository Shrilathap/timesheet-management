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
  date: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  action: string;
  year: number;
  weekStartDate: string;
  [key: string]: unknown;
}


export interface TimesheetFilters {
  status?: string;
  dateRange?: string;
}



export interface ITask {
  _id?: string;
  taskName: string;
  projectName: string;
  workType: string;
  taskDescription: string;
  hours: number;
  date: string;
}

export interface ITimesheet {
  _id?: string;
  weekStartDate: string;
  weekEndDate: string;
  weekNumber: number;
  year: number;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  tasks: ITask[];
  totalHours: number;
  createdAt?: Date;
  updatedAt?: Date;
}