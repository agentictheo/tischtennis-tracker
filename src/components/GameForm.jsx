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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!player1 || !player2 || !score1 || !score2) {
      setError('Alle Felder sind erforderlich');
      return;
    }

    if (player1 === player2) {
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
        player1,
        player2,
        score1: s1,
        score2: s2,
        winner,
        date,
      };

      await saveGame(game);
      setPlayer1('');
      setPlayer2('');
      setScore1('');
      setScore2('');
      setDate(new Date().toISOString().split('T')[0]);
      onGameAdded();
    } catch (err) {
      setError(`Fehler: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <h2>Neues Spiel</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Spieler 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Score"
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="Spieler 2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Score"
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Speicherung...' : 'Spiel speichern'}
      </button>
    </form>
  );
}
