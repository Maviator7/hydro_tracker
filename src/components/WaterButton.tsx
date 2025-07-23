import React from "react";
import { Plus } from "lucide-react";
import { WaterButtonProps } from "../types";

const WaterButton: React.FC<WaterButtonProps> = ({
  amount,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={() => onClick(amount)}
      disabled={disabled}
      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
        !disabled
          ? "border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 text-blue-700"
          : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
      }`}
    >
      <div className="flex flex-col items-center">
        <Plus size={20} className="mb-1" />
        <span className="text-sm font-medium">{amount}ml</span>
      </div>
    </button>
  );
};

export default WaterButton;
