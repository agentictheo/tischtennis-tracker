import { useState } from 'react';
import { saveFifaGame } from '../lib/supabase';
import './GameForm.css';

const PLAYERS = ['Nicola', 'Janis'];

export default function FifaForm({ onGameAdded }) {
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

    if (score1 === '' || score2 === '') {
      setError('Bitte gib die Scores für beide Spieler ein');
      return;
    }

    const s1 = parseInt(score1);
    const s2 = parseInt(score2);

    if (isNaN(s1) || isNaN(s2) || s1 < 0 || s1 > 10 || s2 < 0 || s2 > 10) {
      setError('Scores müssen zwischen 0 und 10 sein');
      return;
    }

    if (s1 === s2) {
      setError('Unentschieden nicht erlaubt');
      return;
    }

    setLoading(true);
    try {
      // Winner is whoever has more score
      const gameWinner = s1 > s2 ? 'Nicola' : 'Janis';
      const game = {
        id: `game-${Date.now()}`,
        player1: gameWinner,
        player2: gameWinner === 'Nicola' ? 'Janis' : 'Nicola',
        score1: s1,
        score2: s2,
        date,
      };

      await saveFifaGame(game);
      setSuccess(true);
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
        <h2>⚽ Neues FIFA Spiel</h2>
        <p>Gib die Ergebnisse ein</p>
      </div>

      <div className="form-content">
        {/* Player 1 Score */}
        <div className="fifa-score-section">
          <label className="fifa-player-label">Nicola</label>
          <div className="fifa-score-buttons">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
              <button
                key={`nicola-${score}`}
                type="button"
                className={`fifa-score-button ${score1 === String(score) ? 'selected' : ''}`}
                onClick={() => setScore1(String(score))}
                disabled={loading}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        <div className="fifa-vs">vs</div>

        {/* Player 2 Score */}
        <div className="fifa-score-section">
          <label className="fifa-player-label">Janis</label>
          <div className="fifa-score-buttons">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
              <button
                key={`janis-${score}`}
                type="button"
                className={`fifa-score-button ${score2 === String(score) ? 'selected' : ''}`}
                onClick={() => setScore2(String(score))}
                disabled={loading}
              >
                {score}
              </button>
            ))}
          </div>
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
          disabled={loading || score1 === '' || score2 === '' || score1 === score2}
          className="submit-button"
        >
          {loading ? '⏳ Speichern...' : '💾 SPIEL SPEICHERN'}
        </button>
      </div>
    </form>
  );
}
