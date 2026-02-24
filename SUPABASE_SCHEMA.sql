-- Supabase Schema for Tischtennis Tracker
-- Copy and paste into Supabase SQL Editor

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  player1 TEXT NOT NULL,
  player2 TEXT NOT NULL,
  score1 INT NOT NULL,
  score2 INT NOT NULL,
  winner TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_games_date ON games(date DESC);
CREATE INDEX idx_games_winner ON games(winner);

-- Enable RLS (Row Level Security)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policy: Everyone can read
CREATE POLICY "Enable read access for all users" ON games
  FOR SELECT
  USING (true);

-- Create policy: Everyone can insert
CREATE POLICY "Enable insert for all users" ON games
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Everyone can delete their own
CREATE POLICY "Enable delete for all users" ON games
  FOR DELETE
  USING (true);

-- Optional: Create a view for stats
CREATE OR REPLACE VIEW player_stats AS
SELECT
  player,
  COUNT(*) FILTER (WHERE winner = player) as wins,
  COUNT(*) - COUNT(*) FILTER (WHERE winner = player) as losses,
  COUNT(*) as total
FROM (
  SELECT player1 as player, winner FROM games
  UNION ALL
  SELECT player2 as player, winner FROM games
) t
GROUP BY player
ORDER BY wins DESC;
