// 水分摂取記録の型定義
export interface HydrationRecord {
  date: string; // YYYY-MM-DD形式
  intake: number; // 摂取量（ml）
  goal: number; // 目標量（ml）
}

// プログレスバーのプロパティ
export interface ProgressBarProps {
  current: number;
  goal: number;
  className?: string;
}

// 水分追加ボタンのプロパティ
export interface WaterButtonProps {
  amount: number;
  onClick: (amount: number) => void;
  disabled?: boolean;
}

// 日付選択のプロパティ
export interface DateSelectorProps {
  selectedDate: string;
  onChange: (date: string) => void;
  maxDate: string;
}

// 目標設定のプロパティ
export interface GoalSetterProps {
  goal: number;
  onChange: (goal: number) => void;
}

// カスタム入力のプロパティ
export interface CustomWaterInputProps {
  onAdd: (amount: number) => void;
  disabled?: boolean;
}

// 統計カードのプロパティ
export interface StatisticsCardProps {
  records: HydrationRecord[];
}

// 記録履歴のプロパティ
export interface RecordHistoryProps {
  records: HydrationRecord[];
  maxItems?: number;
}

// ローカルストレージのキー
export const STORAGE_KEYS = {
  HYDRATION_RECORDS: 'hydration_records',
  DAILY_GOAL: 'daily_goal',
} as const;

// アプリケーション設定
export interface AppConfig {
  defaultGoal: number;
  minGoal: number;
  maxGoal: number;
  goalStep: number;
  quickAddAmounts: number[];
  maxCustomAmount: number;
}