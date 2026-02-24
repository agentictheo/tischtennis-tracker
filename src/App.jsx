import { useState, useEffect } from 'react';
import GameForm from './components/GameForm';
import FifaForm from './components/FifaForm';
import Dashboard from './components/Dashboard';
import { getGames, getFifaGames } from './lib/supabase';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('tischtennis');
  const [games, setGames] = useState([]);
  const [fifaGames, setFifaGames] = useState([]);
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

  const loadFifaGames = async () => {
    try {
      setLoading(true);
      const data = await getFifaGames();
      setFifaGames(data);
    } catch (error) {
      console.error('Error loading FIFA games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
    loadFifaGames();
  }, []);

  const handleGameAdded = () => {
    loadGames();
  };

  const handleFifaGameAdded = () => {
    loadFifaGames();
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>🎮 Game Tracker</h1>
            <p>Track your games and stats</p>
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

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'tischtennis' ? 'active' : ''}`}
          onClick={() => setActiveTab('tischtennis')}
        >
          🏓 Tischtennis
        </button>
        <button 
          className={`tab ${activeTab === 'fifa' ? 'active' : ''}`}
          onClick={() => setActiveTab('fifa')}
        >
          ⚽ FIFA
        </button>
      </div>

      <main className="container">
        {activeTab === 'tischtennis' && (
          <>
            <GameForm onGameAdded={handleGameAdded} />
            {loading ? (
              <div className="loading">Laden...</div>
            ) : (
              <Dashboard games={games} allGames={games} selectedPlayer="All" />
            )}
          </>
        )}

        {activeTab === 'fifa' && (
          <>
            <FifaForm onGameAdded={handleFifaGameAdded} />
            {loading ? (
              <div className="loading">Laden...</div>
            ) : (
              <Dashboard games={fifaGames} allGames={fifaGames} selectedPlayer="All" isFifa={true} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
