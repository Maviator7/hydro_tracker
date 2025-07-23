# 💧 HydroTracker - 水分摂取記録アプリ

健康的な水分補給をサポートする、使いやすい水分摂取記録・管理アプリケーションです。

![HydroTracker](https://img.shields.io/badge/HydroTracker-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178c6)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff)

## ✨ 主な機能

- 📅 **日別記録**: 日付を選択して水分摂取量を記録
- 🎯 **目標設定**: 1日の水分摂取目標を自由に設定（デフォルト2000ml）
- ⚡ **簡単入力**: 100ml、200ml、300mlのクイックボタン
- ✏️ **カスタム入力**: 任意の量を入力して追加
- 📊 **視覚的進捗**: プログレスバーで達成状況を表示
- 📈 **週間統計**: 過去7日間の平均達成率を表示
- 📋 **履歴表示**: 最近の記録を一覧で確認
- 🎨 **レスポンシブデザイン**: モバイルファーストな美しいUI

## 🚀 クイックスタート

### 前提条件

- Node.js 18.x 以上
- npm または Docker

### ローカル環境での起動

```bash
# リポジトリをクローン
git clone <repository-url>
cd hydro-tracker

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 にアクセス
```

### Docker環境での起動

```bash
# Docker Composeで起動
docker-compose up --build

# ブラウザで http://localhost:3000 にアクセス
```

## 🛠️ 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: CSS Modules
- **アイコン**: Lucide React
- **開発環境**: Docker + Docker Compose
- **データ保存**: LocalStorage（メモリ内）

## 🐳 Docker使用方法

### 開発環境

```bash
# 開発用コンテナの起動
docker-compose up --build

# バックグラウンドで起動
docker-compose up -d

# ログの確認
docker-compose logs -f

# コンテナの停止
docker-compose down
```

### 本番環境

```bash
# 本番用ビルド
docker-compose -f docker-compose.prod.yml up --build

# または直接Dockerを使用
docker build -f Dockerfile.prod -t hydro-tracker .
docker run -p 80:80 hydro-tracker
```

## 🔧 開発

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# TypeScriptコンパイル + 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# TypeScript型チェック
npm run type-check

# ESLintによるコード検査
npm run lint
```

### コンポーネント構成

各コンポーネントは独立して動作し、再利用可能な設計になっています：

- **HydrationTracker**: メインコンポーネント（統合）
- **ProgressBar**: 進捗表示とメッセージ機能
- **WaterButton**: 水分追加ボタン（再利用可能）
- **DateSelector**: 日付選択機能
- **GoalSetter**: 目標設定機能
- **CustomWaterInput**: カスタム量入力機能
- **StatisticsCard**: 統計情報表示
- **RecordHistory**: 記録履歴表示

### 型定義

TypeScriptによる厳密な型定義により、開発時の安全性とIDE支援を提供：

```typescript
interface HydrationRecord {
  date: string; // YYYY-MM-DD形式
  intake: number; // 摂取量（ml）
  goal: number; // 目標量（ml）
}
```

## 🎨 カスタマイズ

### スタイリング

CSS Modulesを使用しているため、スタイルの変更は簡単です：

```css
/* HydrationTracker.module.css */
.container {
  /* カスタムスタイルを追加 */
}
```

### 設定値の変更

`src/constants/config.ts` で各種設定を変更できます：

```typescript
export const DEFAULT_GOAL = 2000; // デフォルト目標量
export const QUICK_AMOUNTS = [100, 200, 300]; // クイックボタンの量
```

## 🚀 将来の拡張予定

- [ ] **PWA対応**: オフラインでの利用
- [ ] **通知機能**: 水分補給リマインダー
- [ ] **データエクスポート**: CSV/JSON形式でのデータ出力
- [ ] **グラフ表示**: Rechartsを使用した詳細な統計グラフ
- [ ] **目標達成バッジ**: ゲーミフィケーション要素
- [ ] **マルチデバイス同期**: クラウドストレージ連携
- [ ] **カスタムテーマ**: ダークモード対応
- [ ] **多言語対応**: 国際化対応

## 🐛 トラブルシューティング

### よくある問題

#### 1. `vite: not found` エラー

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 2. Docker環境でのポート競合

```bash
# 使用中のポートを確認
netstat -tulpn | grep :3000

# 別のポートを使用（docker-compose.yml編集）
ports:
  - "3001:3000"
```

#### 3. スタイルが適用されない

```bash
# CSS Modulesファイルの存在確認
ls src/components/*.module.css

# 開発サーバーの再起動
npm run dev
```

#### 4. TypeScriptエラー

```bash
# 型チェックの実行
npm run type-check

# tsconfig.jsonの確認
cat tsconfig.json
```

### Docker関連の問題

```bash
# コンテナの完全削除
docker-compose down -v
docker system prune -af

# キャッシュなしでリビルド
docker-compose build --no-cache
docker-compose up
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

**健康的な水分補給で、より良い毎日を！** 💧✨

_HydroTracker で水分摂取の習慣化をサポートします。_
