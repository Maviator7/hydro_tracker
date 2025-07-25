import React, { useState, useEffect } from "react";
import { Droplets, Calendar, Target, Plus, Award } from "lucide-react";
import { HydrationRecord } from "../types";
import styles from "./HydrationTracker.module.css";

const HydrationTracker: React.FC = () => {
  const [dailyIntake, setDailyIntake] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);
  const [records, setRecords] = useState<HydrationRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [customAmount, setCustomAmount] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];
  const isToday = selectedDate === today;

  useEffect(() => {
    const selectedRecord = records.find(
      (record) => record.date === selectedDate
    );
    setDailyIntake(selectedRecord ? selectedRecord.intake : 0);
  }, [selectedDate, records]);

  const addWater = (amount: number): void => {
    const newIntake = dailyIntake + amount;
    setDailyIntake(newIntake);

    const updatedRecords = records.filter(
      (record) => record.date !== selectedDate
    );
    updatedRecords.push({
      date: selectedDate,
      intake: newIntake,
      goal: dailyGoal,
    });
    setRecords(
      updatedRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const handleCustomAdd = (): void => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      addWater(amount);
      setCustomAmount("");
    }
  };

  const progressPercent = Math.min((dailyIntake / dailyGoal) * 100, 100);

  const getStatusMessage = (): string => {
    if (progressPercent >= 100) return "🎉 目標達成！素晴らしいです！";
    if (progressPercent >= 80) return "💪 もう少しで目標達成です！";
    if (progressPercent >= 50) return "👍 良いペースです！";
    return "💧 水分補給を忘れずに！";
  };

  const getWeeklyAverage = (): number => {
    const lastWeek = records.slice(0, 7);
    if (lastWeek.length === 0) return 0;
    const totalPercent = lastWeek.reduce((sum, record) => {
      return sum + Math.min((record.intake / record.goal) * 100, 100);
    }, 0);
    return Math.round(totalPercent / lastWeek.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Droplets color="#3b82f6" size={32} />
            <h1 className={styles.title}>水分摂取記録</h1>
          </div>
          <p className={styles.subtitle}>健康的な水分補給をサポート</p>
        </div>

        {/* 日付選択 */}
        <div className={styles.formGroup}>
          <div className={styles.label}>
            <Calendar
              color="#6b7280"
              size={16}
              style={{ marginRight: "0.5rem" }}
            />
            <span>記録日</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
            className={styles.input}
          />
        </div>

        {/* 目標設定 */}
        <div className={styles.formGroup}>
          <div className={styles.label}>
            <Target
              color="#6b7280"
              size={16}
              style={{ marginRight: "0.5rem" }}
            />
            <span>1日の目標 (ml)</span>
          </div>
          <input
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value) || 2000)}
            min="500"
            max="5000"
            step="250"
            className={styles.input}
          />
        </div>

        {/* 進捗表示 */}
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>今日の進捗</span>
            <span className={styles.progressValue}>
              {dailyIntake}ml / {dailyGoal}ml
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            <span className={styles.progressPercent}>
              {Math.round(progressPercent)}%
            </span>
            <p className={styles.progressMessage}>{getStatusMessage()}</p>
          </div>
        </div>

        {/* 水分追加ボタン */}
        <div className={styles.buttonGrid}>
          {[100, 200, 300].map((amount) => (
            <button
              key={amount}
              onClick={() => addWater(amount)}
              disabled={!isToday}
              className={styles.waterButton}
            >
              <Plus size={20} />
              <span className={styles.buttonText}>{amount}ml</span>
            </button>
          ))}
        </div>

        {/* カスタム量追加 */}
        <div className={styles.customInput}>
          <input
            type="number"
            placeholder="カスタム量 (ml)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCustomAdd()}
            min="1"
            max="1000"
            disabled={!isToday}
            className={styles.customInputField}
          />
          <button
            onClick={handleCustomAdd}
            disabled={!isToday || !customAmount}
            className={`${styles.addButton} ${
              !isToday || !customAmount
                ? styles.addButtonDisabled
                : styles.addButtonActive
            }`}
          >
            追加
          </button>
        </div>

        {/* 統計情報 */}
        <div className={styles.statsCard}>
          <div className={styles.statsHeader}>
            <Award color="#0891b2" size={20} />
            <h3 className={styles.statsTitle}>週間統計</h3>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{getWeeklyAverage()}%</div>
              <div className={styles.statLabel}>平均達成率</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{records.length}</div>
              <div className={styles.statLabel}>記録日数</div>
            </div>
          </div>
        </div>

        {/* 最近の記録 */}
        {records.length > 0 && (
          <div>
            <h3 className={styles.historyTitle}>最近の記録</h3>
            <div className={styles.historyList}>
              {records.slice(0, 7).map((record) => {
                const achievementRate = record.intake / record.goal;
                const percentage = Math.round(achievementRate * 100);

                let percentClass = styles.historyNormal;
                if (achievementRate >= 1) percentClass = styles.historySuccess;
                else if (achievementRate >= 0.8)
                  percentClass = styles.historyGood;

                return (
                  <div key={record.date} className={styles.historyItem}>
                    <div>
                      <div className={styles.historyDate}>
                        {new Date(record.date).toLocaleDateString("ja-JP")}
                      </div>
                      <div className={styles.historyDetails}>
                        {record.intake}ml / {record.goal}ml
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${styles.historyPercent} ${percentClass}`}
                      >
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HydrationTracker;
