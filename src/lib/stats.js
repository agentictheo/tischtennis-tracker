export const calculateStats = (games) => {
  if (!games.length) {
    return {
      king: null,
      winstreak: 0,
      kingSince: null,
      summary: { player1: { wins: 0 }, player2: { wins: 0 } },
      last10: [],
    };
  }

  // Count wins per player
  const wins = {};
  games.forEach(game => {
    const winner = game.winner;
    wins[winner] = (wins[winner] || 0) + 1;
  });

  // König (most wins overall)
  const king = Object.entries(wins).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  // König seit (date king started their streak or got title)
  let kingSince = null;
  let winstreak = 0;

  if (king) {
    // Winstreak: consecutive wins by current king
    for (let i = 0; i < games.length; i++) {
      if (games[i].winner === king) {
        winstreak++;
      } else {
        break;
      }
    }
    // König seit: date of first game in current win streak
    const streakStartIdx = winstreak > 0 ? winstreak - 1 : 0;
    if (games[streakStartIdx]) {
      kingSince = games[streakStartIdx].date;
    }
  }

  // Bilanz (summary stats for each player mentioned)
  const allPlayers = new Set();
  games.forEach(g => {
    allPlayers.add(g.player1);
    allPlayers.add(g.player2);
  });

  const summary = {};
  allPlayers.forEach(player => {
    const playerGames = games.filter(g => g.player1 === player || g.player2 === player);
    const playerWins = playerGames.filter(g => g.winner === player).length;
    const playerLosses = playerGames.length - playerWins;
    summary[player] = {
      wins: playerWins,
      losses: playerLosses,
      total: playerGames.length,
    };
  });

  return {
    king,
    winstreak,
    kingSince,
    summary,
    last10: games.slice(0, 10),
  };
};
