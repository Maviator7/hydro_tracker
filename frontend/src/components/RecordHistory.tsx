export default function RecordHistory({ records, maxItems = 7 }) {
  if (records.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3">最近の記録</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {records.slice(0, maxItems).map((record) => {
          const achievementRate = record.intake / record.goal;
          const percentage = Math.round(achievementRate * 100);

          let statusColor = "text-gray-600";
          if (achievementRate >= 1) statusColor = "text-green-600";
          else if (achievementRate >= 0.8) statusColor = "text-blue-600";

          return (
            <div
              key={record.date}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-gray-800">
                  {new Date(record.date).toLocaleDateString("ja-JP")}
                </div>
                <div className="text-sm text-gray-600">
                  {record.intake}ml / {record.goal}ml
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${statusColor}`}>{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
