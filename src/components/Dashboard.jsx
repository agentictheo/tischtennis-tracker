import { calculateStats, formatDaysAgo } from '../lib/stats';
import './Dashboard.css';

const getWinner = (game) => {
  if (game.winner) return game.winner;
  return game.score1 > game.score2 ? game.player1 : game.player2;
};

export default function Dashboard({ games, allGames, selectedPlayer }) {
  const stats = calculateStats(games, allGames);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-CH');
  };

  const getStreakBadge = () => {
    if (stats.winstreak === 0) return null;
    if (stats.winstreak === 1) return '🔥';
    if (stats.winstreak <= 3) return '🔥🔥';
    return '🔥🔥🔥';
  };

  const getMedalEmoji = (position) => {
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return '⭐';
  };

  return (
    <div className="dashboard">
      {/* Stats Cards Grid */}
      <div className="stats-grid">
        {/* König Card */}
        <div className="stat-card könig-card">
          <div className="stat-icon">👑</div>
          <div className="stat-label">König</div>
          <div className="stat-value">{stats.king || '-'}</div>
          {stats.kingsSince && (
            <div className="stat-subtext">
              seit {formatDaysAgo(stats.daysAsSince)}
            </div>
          )}
        </div>

        {/* Win Streak Card */}
        <div className="stat-card streak-card">
          <div className="stat-icon">{getStreakBadge() || '📊'}</div>
          <div className="stat-label">Win Streak</div>
          <div className="stat-value">{stats.winstreak}</div>
          <div className="stat-subtext">{stats.king ? `${stats.king}'s streak` : 'No streak'}</div>
        </div>

        {/* Win Rate Card */}
        {selectedPlayer !== 'All' && (
          <div className="stat-card winrate-card">
            <div className="stat-icon">📈</div>
            <div className="stat-label">Win Rate</div>
            <div className="stat-value">{stats.winRate}%</div>
            <div className="win-rate-bar">
              <div 
                className="win-rate-fill" 
                style={{ width: `${stats.winRate}%` }}
              />
            </div>
          </div>
        )}

        {/* Total Games Card */}
        <div className="stat-card total-card">
          <div className="stat-icon">🏓</div>
          <div className="stat-label">Spiele</div>
          <div className="stat-value">{stats.totalGames}</div>
          <div className="stat-subtext">Games tracked</div>
        </div>
      </div>

      {/* Head-to-Head Section */}
      {Object.keys(stats.headToHead).length > 0 && selectedPlayer === 'All' && (
        <section className="h2h-section">
          <h2 className="section-title">🤝 Head-to-Head</h2>
          <div className="h2h-grid">
            {Object.values(stats.headToHead).map((matchup) => (
              <div key={`${matchup.p1}-${matchup.p2}`} className="h2h-card">
                <div className="h2h-players">
                  <span className="player">{matchup.p1}</span>
                  <span className="vs">vs</span>
                  <span className="player">{matchup.p2}</span>
                </div>
                <div className="h2h-score">
                  <div className={`h2h-result ${matchup.p1Wins > matchup.p2Wins ? 'lead' : ''}`}>
                    {matchup.p1Wins}
                  </div>
                  <span className="separator">:</span>
                  <div className={`h2h-result ${matchup.p2Wins > matchup.p1Wins ? 'lead' : ''}`}>
                    {matchup.p2Wins}
                  </div>
                </div>
                <div className="h2h-total">{matchup.total} games</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bilanz Section */}
      <section className="bilanz-section">
        <h2 className="section-title">📊 Bilanz {selectedPlayer !== 'All' ? `(${selectedPlayer})` : ''}</h2>
        <div className="bilanz-table-wrapper">
          {Object.entries(stats.summary).length > 0 ? (
            <table className="bilanz-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Spieler</th>
                  <th>Siege</th>
                  <th>Niederlagen</th>
                  <th>Total</th>
                  <th>Quote</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.summary)
                  .sort((a, b) => b[1].wins - a[1].wins)
                  .map(([player, data], idx) => (
                    <tr key={player} className="bilanz-row">
                      <td className="medal">{getMedalEmoji(idx)}</td>
                      <td className="player-name">{player}</td>
                      <td className="wins">{data.wins}</td>
                      <td className="losses">{data.losses}</td>
                      <td className="total">{data.total}</td>
                      <td className="winrate">{data.winRate}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-state">Keine Spiele noch</p>
          )}
        </div>
      </section>

      {/* Recent Games Section */}
      <section className="recent-section">
        <h2 className="section-title">🕐 Letzte 10 Spiele</h2>
        <div className="recent-list">
          {stats.last10.length > 0 ? (
            stats.last10.map((game, idx) => (
              <div key={game.id || idx} className="game-item">
                <div className="game-date">{formatDate(game.date)}</div>
                <div className="game-content">
                  <div className="game-players">
                    <span className={`player-name ${getWinner(game) === game.player1 ? 'winner' : ''}`}>
                      {game.player1}
                    </span>
                    <div className="game-score">
                      <span className="score-value">{game.score1}</span>
                      <span className="score-separator">:</span>
                      <span className="score-value">{game.score2}</span>
                    </div>
                    <span className={`player-name ${getWinner(game) === game.player2 ? 'winner' : ''}`}>
                      {game.player2}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-state">Keine Spiele noch</p>
          )}
        </div>
      </section>
    </div>
  );
}
