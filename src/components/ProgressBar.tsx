import React from "react";
import { ProgressBarProps } from "../types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  goal,
  className = "",
}) => {
  const progressPercent = Math.min((current / goal) * 100, 100);

  const getStatusMessage = (): string => {
    if (progressPercent >= 100) return "🎉 目標達成！素晴らしいです！";
    if (progressPercent >= 80) return "💪 もう少しで目標達成です！";
    if (progressPercent >= 50) return "👍 良いペースです！";
    return "💧 水分補給を忘れずに！";
  };

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">今日の進捗</span>
        <span className="text-sm text-gray-500">
          {current}ml / {goal}ml
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="text-center">
        <span className="text-lg font-bold text-blue-600">
          {Math.round(progressPercent)}%
        </span>
        <p className="text-sm text-gray-600 mt-1">{getStatusMessage()}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
