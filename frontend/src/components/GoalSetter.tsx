import React from "react";
import { Target } from "lucide-react";
import { GoalSetterProps } from "../types";

const GoalSetter: React.FC<GoalSetterProps> = ({ goal, onChange }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Target className="text-gray-500 mr-2" size={16} />
        <label className="text-sm font-medium text-gray-700">
          1日の目標 (ml)
        </label>
      </div>
      <input
        type="number"
        value={goal}
        onChange={(e) => onChange(parseInt(e.target.value) || 2000)}
        min="500"
        max="5000"
        step="250"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default GoalSetter;
