import { useState } from 'react';
import { saveGame } from '../lib/supabase';
import './GameForm.css';

export default function GameForm({ onGameAdded }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!player1 || !player2 || !score1 || !score2) {
      setError('Alle Felder sind erforderlich');
      return;
    }

    if (player1.trim() === player2.trim()) {
      setError('Spieler müssen unterschiedlich sein');
      return;
    }

    const s1 = parseInt(score1);
    const s2 = parseInt(score2);

    if (isNaN(s1) || isNaN(s2)) {
      setError('Scores müssen Zahlen sein');
      return;
    }

    if (s1 === s2) {
      setError('Unentschieden nicht erlaubt');
      return;
    }

    setLoading(true);
    try {
      const winner = s1 > s2 ? player1 : player2;
      const game = {
        player1: player1.trim(),
        player2: player2.trim(),
        score1: s1,
        score2: s2,
        winner,
        date,
      };

      await saveGame(game);
      setSuccess(true);
      setPlayer1('');
      setPlayer2('');
      setScore1('');
      setScore2('');
      setDate(new Date().toISOString().split('T')[0]);
      
      setTimeout(() => setSuccess(false), 3000);
      onGameAdded();
    } catch (err) {
      setError(`Fehler: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div className="form-header">
        <h2>🎮 Neues Spiel</h2>
        <p>Erfassen Sie eine neue Partie</p>
      </div>

      <div className="form-content">
        {/* Player 1 Input */}
        <div className="form-group">
          <label htmlFor="player1" className="form-label">Spieler 1</label>
          <input
            id="player1"
            type="text"
            placeholder="z.B. Janis"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            disabled={loading}
            className="form-input"
            autoComplete="off"
          />
        </div>

        {/* Score Row */}
        <div className="score-row">
          <div className="form-group">
            <label htmlFor="score1" className="form-label">Score</label>
            <input
              id="score1"
              type="number"
              min="0"
              max="11"
              placeholder="11"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              disabled={loading}
              className="form-input score-input"
            />
          </div>

          <div className="vs-divider">
            <span>vs</span>
          </div>

          <div className="form-group">
            <label htmlFor="score2" className="form-label">Score</label>
            <input
              id="score2"
              type="number"
              min="0"
              max="11"
              placeholder="11"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              disabled={loading}
              className="form-input score-input"
            />
          </div>
        </div>

        {/* Player 2 Input */}
        <div className="form-group">
          <label htmlFor="player2" className="form-label">Spieler 2</label>
          <input
            id="player2"
            type="text"
            placeholder="z.B. Nicola"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            disabled={loading}
            className="form-input"
            autoComplete="off"
          />
        </div>

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

        {/* Error Message */}
        {error && (
          <div className="form-message error-message">
            <span className="message-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="form-message success-message">
            <span className="message-icon">✅</span>
            <span>Spiel erfolgreich gespeichert!</span>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          <span className="button-icon">
            {loading ? '⏳' : '💾'}
          </span>
          {loading ? 'Speicherung...' : 'Spiel speichern'}
        </button>
      </div>
    </form>
  );
}
