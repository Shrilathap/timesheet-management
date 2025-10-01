"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option<T = string | number> {
  label: string;
  value: T;
}

interface CustomSelectProps<T = string | number> {
  options: Option<T>[];
  placeholder?: string;
  value: T | null; // controlled value from parent
  onChange: (value: T) => void;
}

export default function CustomSelect<T extends string | number>({
  options,
  placeholder = "Select an option",
  value,
  onChange,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Compute selected option based on parent value
  const selected = value !== null ? options.find((o) => o.value === value) || null : null;

  const handleSelect = (option: Option<T>) => {
    setIsOpen(false);
    onChange(option.value); // parent updates value
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="text-gray-700">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value.toString()}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
