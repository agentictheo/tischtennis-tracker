import { useState } from 'react';
import { saveGame } from '../lib/supabase';
import './GameForm.css';

const PLAYERS = ['Nicola', 'Janis'];

export default function GameForm({ onGameAdded }) {
  const [winner, setWinner] = useState(null);
  const [loserScore, setLoserScore] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getLoser = () => {
    return winner === 'Nicola' ? 'Janis' : 'Nicola';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!winner) {
      setError('Bitte wähle den Gewinner aus');
      return;
    }

    if (loserScore === '') {
      setError('Bitte gib die Punkte des Verlierers ein');
      return;
    }

    const score = parseInt(loserScore);

    if (isNaN(score) || score < 0 || score > 10) {
      setError('Punkte müssen zwischen 0 und 10 sein');
      return;
    }

    setLoading(true);
    try {
      const loser = getLoser();
      const game = {
        id: `game-${Date.now()}`,
        player1: winner,
        player2: loser,
        score1: 11,
        score2: score,
        date,
      };

      await saveGame(game);
      setSuccess(true);
      setWinner(null);
      setLoserScore('');
      setDate(new Date().toISOString().split('T')[0]);
      
      setTimeout(() => setSuccess(false), 3000);
      onGameAdded();
    } catch (err) {
      setError(`Fehler: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loser = getLoser();

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div className="form-header">
        <h2>🎮 Neues Spiel</h2>
        <p>Wer hat gewonnen?</p>
      </div>

      <div className="form-content">
        {/* Winner Selection */}
        <div className="winner-selection">
          {PLAYERS.map(player => (
            <button
              key={player}
              type="button"
              className={`player-button ${winner === player ? 'selected' : ''}`}
              onClick={() => setWinner(player)}
              disabled={loading}
            >
              <span className="player-name">{player}</span>
              <span className="player-score">11</span>
            </button>
          ))}
        </div>

        {/* Loser Score Buttons */}
        {winner && (
          <div className="loser-section">
            <label className="loser-label">
              Punkte für {loser}
            </label>
            <div className="score-buttons">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
                <button
                  key={score}
                  type="button"
                  className={`score-button ${loserScore === String(score) ? 'selected' : ''}`}
                  onClick={() => setLoserScore(String(score))}
                  disabled={loading}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="date" className="form-label">Datum</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={loading}
            className="form-input"
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            ✅ Spiel gespeichert!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !winner || !loserScore}
          className="submit-button"
        >
          {loading ? '⏳ Speichern...' : '💾 SPIEL SPEICHERN'}
        </button>
      </div>
    </form>
  );
}
