import { useState, useEffect } from 'react';
import GameForm from './components/GameForm';
import Dashboard from './components/Dashboard';
import { getGames } from './lib/supabase';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>🏓 Tischtennis Tracker</h1>
            <p>Track your table tennis games and stats</p>
          </div>
          <div className="header-controls">
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <GameForm onGameAdded={handleGameAdded} />
        {loading ? (
          <div className="loading">Laden...</div>
        ) : (
          <Dashboard games={games} allGames={games} selectedPlayer="All" />
        )}
      </main>

      <footer className="footer">
        <p>Tischtennis Tracker 2026 | {games.length} Spiele</p>
      </footer>
    </div>
  );
}

export default App;
