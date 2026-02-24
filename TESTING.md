# Tischtennis Tracker - Testing Guide

## Running the App

### Development Server
```bash
npm install
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

---

## Testing Checklist

### Visual Design ✨
- [ ] Header shows blue/purple gradient
- [ ] All cards have rounded corners (12px)
- [ ] Glassmorphism effect visible on controls
- [ ] Icons float on stat cards
- [ ] Smooth hover animations on cards
- [ ] Color scheme is professional (blue, purple, green, amber)

### Player Dropdown 🎯
- [ ] Dropdown shows "All Players" by default
- [ ] Clicking dropdown shows list of players (Janis, Nicola, etc.)
- [ ] Selecting a player filters the data
- [ ] Statistics update for selected player only
- [ ] "All Players" option resets to show all data

### Dark Mode 🌙
- [ ] Moon icon (🌙) visible in header
- [ ] Click toggles to dark mode
- [ ] Entire app changes to dark theme
- [ ] All text is readable on dark background
- [ ] Click again returns to light mode

### Dashboard Stats 📊

#### König Card (👑)
- [ ] Shows current leader (most wins)
- [ ] Shows "seit X days ago" or date
- [ ] Gradient background (blue)
- [ ] Hover effect lifts the card

#### Win Streak Card (🔥)
- [ ] Shows consecutive wins by current king
- [ ] Fire emojis appear (🔥 🔥 🔥 for high streaks)
- [ ] Displays king's name
- [ ] Gradient background (purple)

#### Win Rate Card (📈)
- [ ] Only shows when single player selected
- [ ] Displays percentage (e.g., "67%")
- [ ] Progress bar shows visual representation
- [ ] Green gradient background

#### Total Games Card (🏓)
- [ ] Shows count of games
- [ ] Updates as new games added
- [ ] Amber/yellow gradient

### Head-to-Head Stats 🤝
- [ ] Only visible when "All Players" selected
- [ ] Shows matchup cards (Player1 vs Player2)
- [ ] Displays win count for each player
- [ ] Shows total games between pair
- [ ] Card hovers lift and highlight

### Bilanz Table 📋
- [ ] Shows all players sorted by wins (descending)
- [ ] Columns: Medal | Player | Wins | Losses | Total | Win%
- [ ] Medal emojis: 🥇 🥈 🥉 ⭐
- [ ] Wins are green, losses are red
- [ ] Win rate percentage shows correct calculation
- [ ] Table rows highlight on hover
- [ ] Responsive: columns hidden on mobile

### Recent Games 🕐
- [ ] Shows last 10 games in order (newest first)
- [ ] Date displayed for each game
- [ ] Winner is highlighted/bolded
- [ ] Score prominently displayed
- [ ] "Player wins" badge shows result
- [ ] Smooth animation when games load

### Game Form 🎮
- [ ] Header shows "Neues Spiel" 
- [ ] Four input fields visible:
  - [ ] Player 1 name
  - [ ] Player 1 score
  - [ ] Player 2 score
  - [ ] Player 2 name
- [ ] Date picker shows today by default
- [ ] Submit button has gradient background
- [ ] Button shows "💾 Spiel speichern"

### Form Validation ✅
Test each validation:
- [ ] Empty fields: "Alle Felder sind erforderlich"
- [ ] Same player names: "Spieler müssen unterschiedlich sein"
- [ ] Invalid scores: "Scores müssen Zahlen sein"
- [ ] Tie score: "Unentschieden nicht erlaubt"
- [ ] Valid submission: Shows success message "✅ Spiel erfolgreich gespeichert!"
- [ ] Form clears after successful submission

### Success/Error Messages 📢
- [ ] Error messages have warning icon (⚠️) and red background
- [ ] Success messages have checkmark (✅) and green background
- [ ] Messages animate in smoothly
- [ ] Success message auto-dismisses after 3 seconds
- [ ] Form is disabled during submission (loading state)

### Responsive Design 📱

#### Desktop (>1024px)
- [ ] 4-column stats grid
- [ ] Header controls side-by-side
- [ ] All table columns visible
- [ ] Optimal spacing and padding

#### Tablet (768px - 1024px)
- [ ] 2-column stats grid
- [ ] Dropdown stacked in header
- [ ] Table still readable
- [ ] Adjusted padding

#### Mobile (<480px)
- [ ] 1-column stats grid
- [ ] Full-width inputs
- [ ] Dropdown takes full width
- [ ] Table columns hidden intelligently
- [ ] All content scrollable without horizontal scroll
- [ ] Touch targets are large enough (44px+)

### Performance ⚡
- [ ] App loads quickly
- [ ] Animations are smooth (no jank)
- [ ] No console errors
- [ ] Page scrolls smoothly
- [ ] Form submission is responsive

### Browser Compatibility 🌐
- [ ] Works in Chrome/Edge
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

---

## Test Data

### Sample Game Data
Create games with this data to test all features:
```
1. Janis 11 : Nicola 8 (2025-02-24)
2. Nicola 11 : Janis 9 (2025-02-24)
3. Janis 11 : Nicola 6 (2025-02-23)
4. Janis 11 : Nicola 7 (2025-02-23)
5. Nicola 11 : Janis 10 (2025-02-22)
6. Janis 11 : Nicola 4 (2025-02-22)
7. Janis 11 : Nicola 5 (2025-02-21)
```

Expected Results:
- **König**: Janis (5 wins)
- **Win Rate (Janis)**: 71% (5/7)
- **Win Rate (Nicola)**: 29% (2/7)
- **Win Streak**: 2 (Janis's last 2 games)
- **H2H (Janis vs Nicola)**: Janis 5 - Nicola 2

---

## Common Issues & Solutions

### Styles not loading?
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check CSS files are in `src/components/`
- [ ] Check import paths in component files

### Dark mode not working?
- [ ] Ensure `.dark-mode` class is applied to `.app` div
- [ ] Check CSS variables are set correctly
- [ ] Verify browser console for errors

### Stats not updating?
- [ ] Check data is saved (check localStorage)
- [ ] Verify game data has required fields
- [ ] Check calculations in `src/lib/stats.js`

### Mobile layout broken?
- [ ] Check viewport meta tag in `index.html`
- [ ] Test with actual mobile device or DevTools
- [ ] Verify media queries are correct

---

## Performance Benchmarks

Expected metrics:
- **Page Load Time**: <2 seconds (on 4G)
- **Time to Interactive**: <3 seconds
- **Largest Contentful Paint**: <2.5 seconds
- **Bundle Size**: ~115 KB gzipped
- **Lighthouse Score**: 90+

Test with:
```bash
npm run build
# Then analyze with Lighthouse in DevTools
```

---

## Accessibility Testing ♿

- [ ] All buttons are keyboard navigable (Tab)
- [ ] Form labels are associated with inputs
- [ ] Color contrast is sufficient (WCAG AA)
- [ ] Focus states are visible
- [ ] Error messages are announced
- [ ] Screen reader works (test with NVDA/JAWS)

---

## Sign-Off Checklist

Before considering complete, verify:
- [ ] All visual design elements implemented
- [ ] All features working as designed
- [ ] Responsive on all breakpoints
- [ ] No console errors or warnings
- [ ] Performance meets targets
- [ ] Accessibility standards met
- [ ] Code is committed to git
- [ ] Ready for deployment

---

Good luck testing! 🚀
