"use client";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

type TimesheetDayItem = {
  date: string;
  taskName: string;
  hours: number;
  projectName: string;
};

export default function TimesheetDay({ item }: { item: TimesheetDayItem }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="font-semibold mb-3">{item.date}</h3>
      <div className="space-y-3">
        {/* {tasks.map((t, i) => (
          <TimesheetTask key={i} {...t} />
        ))} */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 relative">
          <div className="flex-1 text-sm">{item.taskName}</div>
          <div className="text-sm text-gray-600 mr-4">{item.hours} hrs</div>
          <div className="text-xs font-medium text-blue-600 border border-blue-100 px-2 py-1 rounded-md">
            {item.projectName}
          </div>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="ml-3 text-gray-500 hover:text-gray-700"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-3 top-10 bg-white border shadow rounded-md text-sm">
              <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                Edit
              </button>
              <button className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 text-left">
                Delete
              </button>
            </div>
          )}
        </div>

        <button className="w-full border-2 border-dashed border-gray-300 text-gray-500 text-sm py-2 rounded-md hover:bg-gray-50">
          + Add new task
        </button>
      </div>
    </div>
  );
}
