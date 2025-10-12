"use client";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function TimesheetTask({
  task,
  hours,
  project,
}: {
  task: string;
  hours: number;
  project: string;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 relative">
      <div className="flex-1 text-sm">{task}</div>
      <div className="text-sm text-gray-600 mr-4">{hours} hrs</div>
      <div className="text-xs font-medium text-blue-600 border border-blue-100 px-2 py-1 rounded-md">
        {project}
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
  );
}
