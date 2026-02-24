import { calculateStats } from '../lib/stats';
import './Dashboard.css';

export default function Dashboard({ games }) {
  const stats = calculateStats(games);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-CH');
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">König</div>
          <div className="stat-value">{stats.king || '-'}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Winstreak</div>
          <div className="stat-value">{stats.winstreak}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">König seit</div>
          <div className="stat-value">{formatDate(stats.kingSince)}</div>
        </div>
      </div>

      <div className="bilanz-section">
        <h3>Bilanz</h3>
        <div className="bilanz-table">
          {Object.entries(stats.summary).length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Spieler</th>
                  <th>Siege</th>
                  <th>Niederlagen</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.summary)
                  .sort((a, b) => b[1].wins - a[1].wins)
                  .map(([player, data]) => (
                    <tr key={player}>
                      <td>{player}</td>
                      <td className="wins">{data.wins}</td>
                      <td className="losses">{data.losses}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="empty">Keine Spiele noch</p>
          )}
        </div>
      </div>

      <div className="recent-section">
        <h3>Letzte 10 Spiele</h3>
        <div className="recent-list">
          {stats.last10.length > 0 ? (
            stats.last10.map((game) => (
              <div key={game.id} className="game-item">
                <div className="game-date">{formatDate(game.date)}</div>
                <div className="game-score">
                  <span className={game.winner === game.player1 ? 'winner' : ''}>
                    {game.player1}
                  </span>
                  <span className="score">
                    {game.score1} : {game.score2}
                  </span>
                  <span className={game.winner === game.player2 ? 'winner' : ''}>
                    {game.player2}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">Keine Spiele noch</p>
          )}
        </div>
      </div>
    </div>
  );
}
