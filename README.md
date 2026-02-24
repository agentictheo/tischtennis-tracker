# 🏓 Tischtennis Tracker

A minimal table tennis game tracking application built with React + Vite, with optional Supabase backend integration and Netlify deployment.

## ✨ Features

- **Game Logging Form**: Record games with two players, scores, and dates
- **König**: Current leader (player with most wins)
- **Winstreak**: Consecutive wins of the current leader
- **König seit**: Date when the current leader's streak started
- **Bilanz**: Win/loss statistics for all players
- **Letzte 10 Spiele**: Recent games in reverse chronological order
- **Data Persistence**: localStorage fallback (no backend required for MVP)
- **Supabase Ready**: Drop-in credentials for backend support

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the app.

### Sample Data

The app uses localStorage by default. Add test games via the form to populate the dashboard.

## 🔧 Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS Modules (no dependencies)
- **Data**: localStorage (MVP) + Supabase (optional)
- **Deployment**: Netlify (configured)

## 📦 Deployment

### Deploy to Netlify

```bash
# Option 1: Connect GitHub repo
# - Push to GitHub
# - Connect repo to Netlify dashboard
# - Auto-deploys on push

# Option 2: Direct CLI
netlify deploy --prod --dir=dist

# Option 3: Netlify CI/CD
# netlify.toml is pre-configured
```

## 🔌 Supabase Integration (Optional)

1. Create a Supabase project at https://supabase.com
2. Create a `games` table:
   ```sql
   CREATE TABLE games (
     id TEXT PRIMARY KEY,
     player1 TEXT NOT NULL,
     player2 TEXT NOT NULL,
     score1 INT NOT NULL,
     score2 INT NOT NULL,
     winner TEXT NOT NULL,
     date TIMESTAMP NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
3. Add environment variables to `.env.local`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart dev server

The app automatically falls back to localStorage if Supabase is not configured.

## 📊 Data Schema (localStorage)

Games are stored as JSON:

```javascript
{
  id: "1708795200000",
  player1: "Alice",
  player2: "Bob",
  score1: 11,
  score2: 8,
  winner: "Alice",
  date: "2026-02-24"
}
```

## 🎨 Customization

- Colors: Edit `:root` variables in `src/App.css`
- Fonts: Modify `font-family` in `src/App.css` and `src/index.css`
- Stats: Extend `calculateStats()` in `src/lib/stats.js`

## 📄 License

MIT - Built for table tennis enthusiasts
