import { useState, useEffect } from 'react';
import GameForm from './components/GameForm';
import Dashboard from './components/Dashboard';
import { getGames } from './lib/supabase';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleGameAdded = () => {
    loadGames();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🏓 Tischtennis Tracker</h1>
        <p>Track your table tennis games and stats</p>
      </header>

      <main className="container">
        <GameForm onGameAdded={handleGameAdded} />
        {loading ? (
          <div className="loading">Laden...</div>
        ) : (
          <Dashboard games={games} />
        )}
      </main>

      <footer className="footer">
        <p>Tischtennis Tracker 2026 | Storage: {games.length} Spiele</p>
      </footer>
    </div>
  );
}

export default App;
