"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import TimesheetDay from "@/components/TimesheetDay";



export default function TimesheetDetailsPage() {
  const { slug } = useParams();

  const [timesheetData, setTimesheetData] = useState<[]>([]);
  const [totalHours, setTotalHours] = useState(40);
  const [loggedHours, setLoggedHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("")


  useEffect(() => {
    if (!slug) return;

    const fetchTimesheet = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔹 Replace this URL with your actual API endpoint
        const response = await fetch(`/api/timesheets/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch timesheet data");
        }

        const data = await response.json();

        setTotalHours(40);
        setDate(data.date)
        setLoggedHours(data.hoursLogged);
        setTimesheetData(data.tasks || []);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "message" in err) {
          setError((err as { message?: string }).message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheet();
  }, [slug]);

  const progressPercent =
    totalHours > 0 ? (loggedHours / totalHours) * 100 : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500">
        Loading timesheet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full sm:w-3/4 bg-white rounded-xl shadow-md p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          This week &#39; s timesheet
        </h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {loggedHours}/{totalHours} hrs
          </span>
        </div>
      </div>

      {/* Date Range */}
      <p className="text-gray-500 text-sm mb-6">
        {date}
      </p>

      {/* Timesheet Data */}
      <div className="space-y-6">
        {timesheetData.length > 0 ? (
          timesheetData.map((item, index) => (
            <TimesheetDay key={index} item={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No entries found for this week.
          </p>
        )}
      </div>
    </div>
  );
}
