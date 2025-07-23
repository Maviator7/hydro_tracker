import React from "react";
import { Calendar } from "lucide-react";
import { DateSelectorProps } from "../types";

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onChange,
  maxDate,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Calendar className="text-gray-500 mr-2" size={16} />
        <label className="text-sm font-medium text-gray-700">記録日</label>
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        max={maxDate}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default DateSelector;
