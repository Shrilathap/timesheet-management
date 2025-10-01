// "use client";

// import { useEffect, useState } from "react";

// interface EntryData {
//   projectName: string;
//   typeOfWork: string;
//   taskDescription: string;
//   hours: number;
// }

// interface AddEntryModalProps {
//   isOpen: boolean;
//   formData: EntryData;
//   onChange: (data: EntryData) => void;
//   onClose: () => void;
// }

// export default function AddEntryModal({
//   isOpen,
//   formData,
//   onChange,
//   onClose,
// }: AddEntryModalProps) {
//   const [localData, setLocalData] = useState<EntryData>(formData);

//   // Sync when parent sends new data
//   useEffect(() => {
//     setLocalData(formData);
//   }, [formData]);

//   const handleChange = (key: keyof EntryData, value: any) => {
//     const updated = { ...localData, [key]: value };
//     setLocalData(updated);
//     onChange(updated); // 2-way binding
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
//         <h2 className="text-lg font-semibold mb-4">Add New Entry</h2>

//         {/* Project */}
//         <label className="block text-sm font-medium mb-1">Select Project *</label>
//         <select
//           value={localData.projectName}
//           onChange={(e) => handleChange("projectName", e.target.value)}
//           className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-200"
//         >
//           <option value="">Project Name</option>
//           <option value="Project A">Project A</option>
//           <option value="Project B">Project B</option>
//         </select>

//         {/* Type of Work */}
//         <label className="block text-sm font-medium mb-1">Type of Work *</label>
//         <select
//           value={localData.typeOfWork}
//           onChange={(e) => handleChange("typeOfWork", e.target.value)}
//           className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-200"
//         >
//           <option value="Bug fixes">Bug fixes</option>
//           <option value="Feature development">Feature development</option>
//         </select>

//         {/* Task description */}
//         <label className="block text-sm font-medium mb-1">Task description *</label>
//         <textarea
//           value={localData.taskDescription}
//           onChange={(e) => handleChange("taskDescription", e.target.value)}
//           placeholder="Write text here..."
//           className="w-full border rounded-lg px-3 py-2 mb-3 h-24 resize-none focus:outline-none focus:ring focus:ring-blue-200"
//         />

//         {/* Hours */}
//         <label className="block text-sm font-medium mb-1">Hours *</label>
//         <div className="flex items-center mb-4">
//           <button
//             type="button"
//             onClick={() =>
//               handleChange("hours", Math.max(1, localData.hours - 1))
//             }
//             className="px-3 py-1 bg-gray-200 rounded-l-lg"
//           >
//             -
//           </button>
//           <input
//             type="number"
//             value={localData.hours}
//             readOnly
//             className="w-16 text-center border-t border-b"
//           />
//           <button
//             type="button"
//             onClick={() => handleChange("hours", localData.hours + 1)}
//             className="px-3 py-1 bg-gray-200 rounded-r-lg"
//           >
//             +
//           </button>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-lg hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => onClose()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Add entry
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
