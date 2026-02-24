import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

try {
  if (SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('dummy')) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.warn('Supabase not configured, using localStorage');
}

// Fallback: localStorage-based data management
const DB_KEY = 'tischtennis_games';

export const getGames = async () => {
  if (supabase) {
    const { data, error } = await supabase.from('games').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
};

export const saveGame = async (game) => {
  const gameData = {
    id: Date.now().toString(),
    ...game,
    date: new Date(game.date).toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase.from('games').insert([gameData]);
    if (error) throw error;
    return data?.[0] || gameData;
  }

  const games = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  games.unshift(gameData);
  localStorage.setItem(DB_KEY, JSON.stringify(games));
  return gameData;
};

export const deleteGame = async (id) => {
  if (supabase) {
    const { error } = await supabase.from('games').delete().eq('id', id);
    if (error) throw error;
  } else {
    const games = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const filtered = games.filter(g => g.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(filtered));
  }
};
