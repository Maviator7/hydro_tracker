-- データベースとユーザーの作成を確実にする
DO $$
BEGIN
    -- ユーザーが存在しない場合のみ作成
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hydro_user') THEN
        CREATE USER hydro_user WITH PASSWORD 'hydro_pass';
    END IF;
END
$$;

-- データベースが存在しない場合のみ作成
SELECT 'CREATE DATABASE hydro_db OWNER hydro_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hydro_db')\gexec

-- 権限付与
GRANT ALL PRIVILEGES ON DATABASE hydro_db TO hydro_user;