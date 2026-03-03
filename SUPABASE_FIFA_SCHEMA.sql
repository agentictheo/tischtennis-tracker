-- Supabase Schema for FIFA Games
-- Copy and paste into Supabase SQL Editor

-- Create fifa_games table
CREATE TABLE IF NOT EXISTS fifa_games (
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
CREATE INDEX IF NOT EXISTS idx_fifa_games_date ON fifa_games(date DESC);
CREATE INDEX IF NOT EXISTS idx_fifa_games_winner ON fifa_games(winner);

-- Enable RLS (Row Level Security)
ALTER TABLE fifa_games ENABLE ROW LEVEL SECURITY;

-- Create policy: Everyone can read
CREATE POLICY "Enable read access for all fifa users" ON fifa_games
  FOR SELECT
  USING (true);

-- Create policy: Everyone can insert
CREATE POLICY "Enable insert for all fifa users" ON fifa_games
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Everyone can delete their own
CREATE POLICY "Enable delete for all fifa users" ON fifa_games
  FOR DELETE
  USING (true);

-- Optional: Create a view for FIFA stats
CREATE OR REPLACE VIEW fifa_player_stats AS
SELECT
  player,
  COUNT(*) FILTER (WHERE winner = player) as wins,
  COUNT(*) - COUNT(*) FILTER (WHERE winner = player) as losses,
  COUNT(*) as total
FROM (
  SELECT player1 as player, winner FROM fifa_games
  UNION ALL
  SELECT player2 as player, winner FROM fifa_games
) t
GROUP BY player
ORDER BY wins DESC;
