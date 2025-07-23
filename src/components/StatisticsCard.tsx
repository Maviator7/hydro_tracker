import React from "react";
import { Award } from "lucide-react";
import { StatisticsCardProps } from "../types";

const StatisticsCard: React.FC<StatisticsCardProps> = ({ records }) => {
  // 週間の平均達成率を計算
  const getWeeklyAverage = (): number => {
    const lastWeek = records.slice(0, 7);
    if (lastWeek.length === 0) return 0;
    const totalPercent = lastWeek.reduce((sum, record) => {
      return sum + Math.min((record.intake / record.goal) * 100, 100);
    }, 0);
    return Math.round(totalPercent / lastWeek.length);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 mb-6">
      <div className="flex items-center mb-2">
        <Award className="text-cyan-600 mr-2" size={20} />
        <h3 className="font-semibold text-gray-800">週間統計</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600">
            {getWeeklyAverage()}%
          </div>
          <div className="text-xs text-gray-600">平均達成率</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600">
            {records.length}
          </div>
          <div className="text-xs text-gray-600">記録日数</div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
