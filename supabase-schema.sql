-- Tischtennis Tracker Schema für Supabase Project: iqfxysimszpncgxuaezn
-- Erstelle diese Tabellen im Supabase SQL Editor

-- ============================================
-- Tischtennis Games Table
-- ============================================
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  player1 TEXT NOT NULL,
  player2 TEXT NOT NULL,
  score1 INTEGER NOT NULL,
  score2 INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnellere Abfragen nach Datum
CREATE INDEX IF NOT EXISTS idx_games_date ON games(date DESC);

-- ============================================
-- FIFA Games Table
-- ============================================
CREATE TABLE IF NOT EXISTS fifa_games (
  id TEXT PRIMARY KEY,
  player1 TEXT NOT NULL,
  player2 TEXT NOT NULL,
  score1 INTEGER NOT NULL,
  score2 INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnellere Abfragen nach Datum
CREATE INDEX IF NOT EXISTS idx_fifa_games_date ON fifa_games(date DESC);

-- ============================================
-- Row-Level Security (RLS) - Optional
-- ============================================
-- Um öffentlichen Lesezugriff zu ermöglichen (wenn gewünscht):

ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE fifa_games ENABLE ROW LEVEL SECURITY;

-- Erlaube anonymen Benutzern zu lesen
CREATE POLICY "allow_anonymous_read_games" ON games
  FOR SELECT
  USING (true);

CREATE POLICY "allow_anonymous_insert_games" ON games
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_anonymous_delete_games" ON games
  FOR DELETE
  USING (true);

CREATE POLICY "allow_anonymous_read_fifa" ON fifa_games
  FOR SELECT
  USING (true);

CREATE POLICY "allow_anonymous_insert_fifa" ON fifa_games
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_anonymous_delete_fifa" ON fifa_games
  FOR DELETE
  USING (true);
