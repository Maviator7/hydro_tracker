from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from typing import Generator

# 環境変数からデータベースURLを取得
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hydro_tracker.db")

# SQLiteの場合のみcheck_same_threadを無効にする
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# セッションメーカー作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースクラス作成
Base = declarative_base()

# データベース依存性関数
def get_db() -> Generator:
    """
    データベースセッションを取得する依存性関数
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# データベース初期化関数
def create_tables():
    """
    すべてのテーブルを作成する
    """
    Base.metadata.create_all(bind=engine)

# データベース接続テスト関数  
def test_connection():
    """
    データベース接続をテストする
    """
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        print("✅ Database connection successful")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False