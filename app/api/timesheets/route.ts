// app/api/timesheets/route.ts
import { NextResponse } from "next/server";

export type Timesheet = {
  week: number;
  date: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
};

const dummyData: Timesheet[] = [
  { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },
  { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },
  { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },
  { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },
  { week: 5, date: "29 January - 2 February, 2024", status: "MISSING" },
  { week: 6, date: "5 - 9 February, 2024", status: "COMPLETED" },
  { week: 7, date: "12 - 16 February, 2024", status: "INCOMPLETE" },
  { week: 8, date: "19 - 23 February, 2024", status: "MISSING" },
  { week: 9, date: "26 February - 1 March, 2024", status: "COMPLETED" },
  { week: 10, date: "4 - 8 March, 2024", status: "COMPLETED" },
  { week: 11, date: "11 - 15 March, 2024", status: "MISSING" },
  { week: 12, date: "18 - 22 March, 2024", status: "COMPLETED" },
  { week: 13, date: "25 - 29 March, 2024", status: "INCOMPLETE" },
  { week: 14, date: "1 - 5 April, 2024", status: "COMPLETED" },
  { week: 15, date: "8 - 12 April, 2024", status: "MISSING" },
  { week: 16, date: "15 - 19 April, 2024", status: "COMPLETED" },
  { week: 17, date: "22 - 26 April, 2024", status: "INCOMPLETE" },
  { week: 18, date: "29 April - 3 May, 2024", status: "COMPLETED" },
  { week: 19, date: "6 - 10 May, 2024", status: "COMPLETED" },
  { week: 20, date: "13 - 17 May, 2024", status: "MISSING" },
  { week: 21, date: "20 - 24 May, 2024", status: "INCOMPLETE" },
  { week: 22, date: "27 - 31 May, 2024", status: "COMPLETED" },
  { week: 23, date: "3 - 7 June, 2024", status: "MISSING" },
  { week: 24, date: "10 - 14 June, 2024", status: "COMPLETED" },
  { week: 25, date: "17 - 21 June, 2024", status: "INCOMPLETE" },
  { week: 26, date: "24 - 28 June, 2024", status: "COMPLETED" },
  { week: 27, date: "1 - 5 July, 2024", status: "COMPLETED" },
  { week: 28, date: "8 - 12 July, 2024", status: "MISSING" },
  { week: 29, date: "15 - 19 July, 2024", status: "COMPLETED" },
  { week: 30, date: "22 - 26 July, 2024", status: "INCOMPLETE" },
  { week: 31, date: "29 July - 2 August, 2024", status: "COMPLETED" },
  { week: 32, date: "5 - 9 August, 2024", status: "MISSING" },
  { week: 33, date: "12 - 16 August, 2024", status: "COMPLETED" },
  { week: 34, date: "19 - 23 August, 2024", status: "INCOMPLETE" },
  { week: 35, date: "26 - 30 August, 2024", status: "COMPLETED" },
  { week: 36, date: "2 - 6 September, 2024", status: "COMPLETED" },
  { week: 37, date: "9 - 13 September, 2024", status: "MISSING" },
  { week: 38, date: "16 - 20 September, 2024", status: "INCOMPLETE" },
  { week: 39, date: "23 - 27 September, 2024", status: "COMPLETED" },
  { week: 40, date: "30 September - 4 October, 2024", status: "COMPLETED" },
  { week: 41, date: "7 - 11 October, 2024", status: "MISSING" },
  { week: 42, date: "14 - 18 October, 2024", status: "COMPLETED" },
  { week: 43, date: "21 - 25 October, 2024", status: "INCOMPLETE" },
  { week: 44, date: "28 October - 1 November, 2024", status: "COMPLETED" },
  { week: 45, date: "4 - 8 November, 2024", status: "MISSING" },
  { week: 46, date: "11 - 15 November, 2024", status: "COMPLETED" },
  { week: 47, date: "18 - 22 November, 2024", status: "INCOMPLETE" },
  { week: 48, date: "25 - 29 November, 2024", status: "COMPLETED" },
  { week: 49, date: "2 - 6 December, 2024", status: "MISSING" },
  { week: 50, date: "9 - 13 December, 2024", status: "COMPLETED" },
];


export async function GET() {
  // Optional: simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(dummyData);
}
