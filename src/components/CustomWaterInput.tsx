import React, { useState } from "react";
import { CustomWaterInputProps } from "../types";

const CustomWaterInput: React.FC<CustomWaterInputProps> = ({
  onAdd,
  disabled = false,
}) => {
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleAdd = (): void => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      onAdd(amount);
      setCustomAmount("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="カスタム量 (ml)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          onKeyPress={handleKeyPress}
          min="1"
          max="1000"
          disabled={disabled}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAdd}
          disabled={disabled || !customAmount}
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            !disabled && customAmount
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default CustomWaterInput;
