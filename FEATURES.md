# Tischtennis Tracker - Features & UI Guide

## 🎨 Visual Design

### Color Palette
```
Primary Blue:      #0078d4 ■ (König card, Primary CTA)
Accent Purple:     #7c3aed ■ (Win Streak, Secondary)
Success Green:     #10b981 ■ (Wins, positive actions)
Warning Amber:     #f59e0b ■ (Total Games)
Danger Red:        #ef4444 ■ (Losses)
Neutral Background: #f3f4f6 ■ (Light)
Neutral Dark:      #0f172a ■ (Dark Mode)
```

### Typography Hierarchy
```
H1: 2rem / 700 weight / Blue         (Header title)
H2: 1.5rem / 700 weight / Primary    (Section titles)
H3: 1.25rem / 600 weight             (Subsections)
Body: 1rem / 400 weight              (Default text)
Label: 0.9rem / 600 weight / Caps    (Form labels)
Small: 0.85rem / 500 weight          (Helper text)
```

---

## 📱 Page Layout

### Header Section
```
┌─────────────────────────────────────────────────────────┐
│  🏓 Tischtennis Tracker          [All Players ▼] [🌙]   │
│  Track your table tennis games                          │
└─────────────────────────────────────────────────────────┘
```

**Features**:
- Logo and title on left
- Player dropdown in center-right
- Dark mode toggle on right
- Sticky positioning (stays at top)
- Blue-to-purple gradient background

### Main Content Area

#### 1. Stats Cards Grid (4 columns desktop)
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│    👑        │     🔥       │     📈       │     🏓       │
│   König      │  Win Streak  │  Win Rate    │   Spiele     │
│   Janis      │      2       │    67%       │     15       │
│ seit 3 days  │ Janis streak │ ▓▓▓▓▓░░░░░░  │ Games tracked│
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Each card has:
- Large emoji icon
- Label (uppercase)
- Main value (bold, large)
- Subtext (secondary info)
- Gradient background (color-coded)
- Hover lift animation

#### 2. Head-to-Head Section (All Players view only)
```
┌────────────────────────────────────┐  ┌────────────────────────────────────┐
│      Janis        vs      Nicola    │  │      Janis        vs      Other     │
│      5           :        2         │  │      3           :        1         │
│      7 games                        │  │      4 games                        │
└────────────────────────────────────┘  └────────────────────────────────────┘
```

Features:
- Shows all player matchups
- Win counts prominently displayed
- Total games in matchup
- Cards hover and highlight
- Only visible when "All Players" selected

#### 3. Bilanz Table
```
┌──────────┬────────────┬──────┬─────────────┬───────┬────────┐
│    🥇    │   Janis    │  5   │      2      │   7   │  71%   │
├──────────┼────────────┼──────┼─────────────┼───────┼────────┤
│    🥈    │   Nicola   │  2   │      5      │   7   │  29%   │
├──────────┼────────────┼──────┼─────────────┼───────┼────────┤
│    🥉    │   Stefan   │  1   │      3      │   4   │  25%   │
└──────────┴────────────┴──────┴─────────────┴───────┴────────┘
         Medal   Player  Wins  Losses  Total  Win Rate
```

Features:
- Sorted by wins (descending)
- Medal emojis (🥇 🥈 🥉 ⭐)
- Color coding: Green wins, Red losses
- Win rate percentage for each player
- Hover effect highlights rows
- Responsive (hides columns on mobile)

#### 4. Recent Games List
```
2025-02-24   Janis 11 : 8 Nicola    [Janis wins]
2025-02-24   Nicola 11 : 9 Janis    [Nicola wins]
2025-02-23   Janis 11 : 6 Nicola    [Janis wins]
2025-02-23   Janis 11 : 7 Nicola    [Janis wins]
```

Features:
- Last 10 games in order (newest first)
- Date on left (uppercase)
- Player names and scores centered
- Winner badge on right
- Winner name highlighted in blue
- Smooth animations on load
- Blue left border accent

---

## 🎮 Game Form

### Form Layout
```
┌─────────────────────────────────────────┐
│  🎮 Neues Spiel                        │
│  Erfassen Sie eine neue Partie          │
├─────────────────────────────────────────┤
│                                         │
│  Spieler 1                              │
│  ┌─────────────────────────────────┐  │
│  │ z.B. Janis          │ (input)     │  │
│  └─────────────────────────────────┘  │
│                                         │
│  Score              Score               │
│  ┌──────────┐ vs ┌──────────┐         │
│  │ 11       │     │ 8        │         │
│  └──────────┘     └──────────┘         │
│                                         │
│  Spieler 2                              │
│  ┌─────────────────────────────────┐  │
│  │ z.B. Nicola         │ (input)     │  │
│  └─────────────────────────────────┘  │
│                                         │
│  Datum                                  │
│  ┌─────────────────────────────────┐  │
│  │ 2025-02-24          │ (date picker) │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │ 💾 Spiel speichern              │  │
│  └─────────────────────────────────┘  │
│  ✅ Spiel erfolgreich gespeichert!     │
└─────────────────────────────────────────┘
```

### Form Features
- Clean, modern layout
- Clear labels (uppercase)
- Input validation (real-time)
- Helpful placeholders
- Date picker with today default
- Submit button with gradient
- Success/error messages with icons
- Loading state (⏳ during submit)
- Form auto-clears on success

### Validation Messages
```
Error (Red):
⚠️ Alle Felder sind erforderlich
⚠️ Spieler müssen unterschiedlich sein
⚠️ Scores müssen Zahlen sein
⚠️ Unentschieden nicht erlaubt

Success (Green):
✅ Spiel erfolgreich gespeichert!
```

---

## 🎯 Player Dropdown

### Default State
```
┌────────────────────┐
│ All Players    ▼   │
└────────────────────┘
```

### Expanded State
```
┌────────────────────┐
│ All Players        │
├────────────────────┤
│ Janis              │
│ Nicola             │
│ Stefan             │
│ Michael            │
└────────────────────┘
```

### Features
- Automatically populated from game data
- Filters statistics in real-time
- Shows player-specific win rate
- Smooth dropdown animation
- Accessible keyboard navigation
- Touch-friendly on mobile

---

## 🌙 Dark Mode

### Light Mode
```
Background: White (#ffffff)
Text: Dark Gray (#1f2937)
Accents: Blue/Purple/Green
Borders: Light Gray (#d1d5db)
```

### Dark Mode
```
Background: Navy (#0f172a)
Text: Light Slate (#f1f5f9)
Accents: Light Blue/Purple
Borders: Slate (#475569)
```

### Toggle
- Moon icon (🌙) in header
- Toggles entire app theme
- Smooth transition (0.3s)
- All components automatically themed

---

## ✨ Animations & Interactions

### Page Load
```
0ms:   Header fades down (opacity 0 → 1)
100ms: Form slides up (translateY 20px → 0)
200ms: Dashboard cards fade in
300ms: Recent games slide up
400ms: Stats cards stagger animation
```

### Card Hover
```
Mouse Enter:
  - translateY(-4px)
  - boxShadow expands
  - Border color changes
  - 300ms smooth ease

Mouse Leave:
  - Reverse animation
  - 300ms cubic-bezier
```

### Button Hover
```
Button:submit Hover
  - translateY(-3px)
  - boxShadow: 0 8px 24px rgba(...)
  - Gradient intensifies

Button:submit Click
  - translateY(-1px)
  - Quick pulse effect
```

### Loading State
```
Submit Button:
  Button Content: 💾 Spiel speichern
  ↓ (click)
  Button Spinning: ⏳ Speicherung...
  ↓ (success/error)
  Message Appears: ✅ / ⚠️
```

---

## 📊 Statistics Explained

### König (King)
The player with the most wins overall.
```
Example: Janis
- 5 wins total
- Most wins among all players
- Displays duration: "seit 3 days ago"
- Updates automatically
```

### Win Streak
Current consecutive wins by the king.
```
Example: Janis on 2-game streak
- Janis won last 2 games
- Fire emojis: 🔥 🔥
- Resets when king loses
```

### Win Rate
Percentage of games won by a player.
```
Janis: 5 wins / 7 total = 71%
- Only shows for selected player
- Progress bar visualization
- Updates with new games
```

### König seit (King since)
Days/weeks since player became king.
```
Examples:
- Today (0 days)
- Yesterday (1 day)
- 3 days ago
- Last week
- 2 weeks ago
```

### Bilanz (Balance)
Complete statistics table for all players.
```
Columns:
- Medal: 🥇 🥈 🥉 ⭐
- Player: Name
- Wins: Count (green)
- Losses: Count (red)
- Total: Win + Loss
- Win %: Percentage
- Sorted: By wins (high to low)
```

### Head-to-Head
Direct matchup records between players.
```
Janis vs Nicola: 5-2
- Janis has 5 wins
- Nicola has 2 wins
- 7 total games
- Shows all pairs
```

### Letzte 10 Spiele (Last 10 Games)
Most recent games displayed.
```
Format: Date | Player1 Score-Score Player2 | Winner
- Newest first
- Max 10 games
- Winner highlighted
- Date formatted (de-CH locale)
```

---

## 📐 Responsive Breakpoints

### Desktop (>1024px)
```
- 4-column stat grid
- Full-width controls in header
- All table columns visible
- Optimal spacing (2rem padding)
```

### Tablet (768px - 1024px)
```
- 2-column stat grid
- Stacked header controls
- Most table columns visible
- Adjusted spacing (1.5rem)
```

### Mobile (<768px)
```
- 2-column stat grid
- Full-width dropdown
- Simplified table layout
- Compact spacing (1rem)
```

### Small Mobile (<480px)
```
- 1-column stat grid
- Full-width all inputs
- Hidden table columns
- Minimal spacing (0.75rem)
- Large touch targets (44px+)
```

---

## 🎓 Design System Values

### Spacing Scale (8px base)
```
0.5rem = 8px   (very tight)
1rem   = 16px  (default gap)
1.5rem = 24px  (comfortable)
2rem   = 32px  (section)
```

### Border Radius
```
4px    = Small inputs
8px    = Medium elements
10px   = Buttons
12px   = Cards
16px   = Form wrapper
20px   = Badges
```

### Shadow Depth
```
shadow-sm   = Subtle (0 2px 8px)
shadow      = Standard (0 4px 20px)
shadow-lg   = Prominent (hover state)
shadow-xl   = Maximum (focus state)
```

### Font Weights
```
300 = Light (secondary text)
400 = Regular (body)
500 = Medium (labels, badges)
600 = Semibold (headings, emphasis)
700 = Bold (titles, medals)
```

---

## 🎯 Accessibility Features

- ✅ Semantic HTML
- ✅ Color contrast (WCAG AA)
- ✅ Keyboard navigation
- ✅ Focus states visible
- ✅ Form labels associated
- ✅ Error messages announced
- ✅ Responsive text sizing
- ✅ Touch targets 44px+
- ✅ Alternative text for icons
- ✅ Reduced motion support

---

## 🚀 Performance Features

- ✅ CSS Grid for layouts (no flex fragility)
- ✅ GPU-accelerated animations (transform, opacity)
- ✅ Debounced stats calculations
- ✅ Lazy component rendering
- ✅ Optimized CSS selectors
- ✅ Minimal repaints
- ✅ Smooth 60 FPS animations
- ✅ CSS variables for theming
- ✅ Efficient media queries
- ✅ Minimal JavaScript (React optimized)

---

This guide covers all major visual and interactive elements of the redesigned Tischtennis Tracker! 🎉
