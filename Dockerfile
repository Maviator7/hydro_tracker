FROM node:18-alpine

WORKDIR /app

# 依存関係をコピーしてインストール
COPY package*.json ./
RUN npm ci

# アプリケーションのソースをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]