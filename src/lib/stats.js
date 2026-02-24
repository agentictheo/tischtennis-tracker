// Helper function to get winner from game
const getWinner = (game) => {
  if (game.winner) return game.winner; // Fallback for old data
  return game.score1 > game.score2 ? game.player1 : game.player2;
};

export const calculateStats = (games, allGames = null) => {
  const dataGames = allGames || games;
  
  if (!games.length) {
    return {
      king: null,
      kingSince: null,
      winstreak: 0,
      winRate: 0,
      summary: {},
      last10: [],
      headToHead: {},
      totalGames: 0,
    };
  }

  // Count wins per player
  const wins = {};
  const totals = {};
  games.forEach(game => {
    const winner = getWinner(game);
    wins[winner] = (wins[winner] || 0) + 1;
    
    [game.player1, game.player2].forEach(p => {
      totals[p] = (totals[p] || 0) + 1;
    });
  });

  // König (most wins overall in all games)
  const allWins = {};
  const allTotals = {};
  dataGames.forEach(game => {
    const winner = getWinner(game);
    allWins[winner] = (allWins[winner] || 0) + 1;
    
    [game.player1, game.player2].forEach(p => {
      allTotals[p] = (allTotals[p] || 0) + 1;
    });
  });
  
  const king = Object.entries(allWins).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  // König seit (date king started their streak)
  let kingsSince = null;
  let winstreak = 0;

  if (king) {
    for (let i = 0; i < games.length; i++) {
      if (getWinner(games[i]) === king) {
        winstreak++;
      } else {
        break;
      }
    }
    
    if (games.length > 0) {
      const streakStartIdx = Math.min(winstreak, games.length - 1);
      kingsSince = games[streakStartIdx]?.date;
    }
  }

  // Calculate days since king took title
  const daysAsSince = kingsSince ? calculateDaysDifference(kingsSince) : 0;

  // Win rate for filtered games
  const selectedPlayer = Object.keys(wins).length === 1 ? Object.keys(wins)[0] : null;
  let winRate = 0;
  if (selectedPlayer && totals[selectedPlayer] > 0) {
    winRate = Math.round((wins[selectedPlayer] / totals[selectedPlayer]) * 100);
  }

  // Bilanz (summary stats for each player in filtered games)
  const allPlayers = new Set();
  games.forEach(g => {
    allPlayers.add(g.player1);
    allPlayers.add(g.player2);
  });

  const summary = {};
  allPlayers.forEach(player => {
    const playerGames = games.filter(g => g.player1 === player || g.player2 === player);
    const playerWins = playerGames.filter(g => getWinner(g) === player).length;
    const playerLosses = playerGames.length - playerWins;
    const rate = playerGames.length > 0 ? Math.round((playerWins / playerGames.length) * 100) : 0;
    
    summary[player] = {
      wins: playerWins,
      losses: playerLosses,
      total: playerGames.length,
      winRate: rate,
    };
  });

  // Head-to-head stats
  const headToHead = {};
  const allPlayersSet = new Set();
  dataGames.forEach(g => {
    allPlayersSet.add(g.player1);
    allPlayersSet.add(g.player2);
  });
  
  const playersArray = Array.from(allPlayersSet).sort();
  for (let i = 0; i < playersArray.length; i++) {
    for (let j = i + 1; j < playersArray.length; j++) {
      const p1 = playersArray[i];
      const p2 = playersArray[j];
      const matchups = dataGames.filter(
        g => (g.player1 === p1 && g.player2 === p2) || (g.player1 === p2 && g.player2 === p1)
      );
      
      const p1Wins = matchups.filter(g => getWinner(g) === p1).length;
      const p2Wins = matchups.filter(g => getWinner(g) === p2).length;
      
      const key = `${p1} vs ${p2}`;
      headToHead[key] = {
        p1,
        p2,
        p1Wins,
        p2Wins,
        total: matchups.length,
      };
    }
  }

  return {
    king,
    kingsSince,
    daysAsSince,
    winstreak,
    winRate,
    summary,
    last10: games.slice(0, 10),
    headToHead,
    totalGames: games.length,
  };
};

export const calculateDaysDifference = (dateStr) => {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDaysAgo = (days) => {
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return 'Last week';
  if (weeks < 4) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return 'Last month';
  return `${months} months ago`;
};
