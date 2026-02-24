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

        {/* Total Games Card */}
        <div className="stat-card total-card">
          <div className="stat-icon">🏓</div>
          <div className="stat-label">Spiele</div>
          <div className="stat-value">{stats.totalGames}</div>
          <div className="stat-subtext">Games tracked</div>
        </div>
      </div>

      {/* Head-to-Head Section */}
      {Object.keys(stats.headToHead).length > 0 && (
        <section className="h2h-section">
          <h2 className="section-title">🤝 Head-to-Head</h2>
          <div className="h2h-grid">
            {Object.values(stats.headToHead).map((matchup) => {
              const p1Rate = matchup.total > 0 ? Math.round((matchup.p1Wins / matchup.total) * 100) : 0;
              const p2Rate = matchup.total > 0 ? Math.round((matchup.p2Wins / matchup.total) * 100) : 0;
              return (
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
                <div className="h2h-quotes">
                  <span className={`quote ${matchup.p1Wins > matchup.p2Wins ? 'lead' : ''}`}>{p1Rate}%</span>
                  <span className={`quote ${matchup.p2Wins > matchup.p1Wins ? 'lead' : ''}`}>{p2Rate}%</span>
                </div>
                <div className="h2h-total">{matchup.total} games</div>
              </div>
            );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
