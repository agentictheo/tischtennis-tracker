# Deployment & Safeguards

## ⚠️ Critical Rules

1. **NEVER commit `index.html` to root**
   - Use `/dist/index.html` only
   - Root `index.html` is in `.gitignore` (protected)

2. **Always commit `/dist/` folder**
   - GitHub Pages reads directly from `dist/` in the repo
   - Never add `dist` to `.gitignore`
   - Production builds are committed

3. **Workflow:** Dev → Build → Commit dist/ → Push → GitHub Pages auto-reads

---

## How It Works

```
Local Development:
  npm run dev              # http://localhost:5173

Production Build:
  npm run build            # Creates dist/index.html + assets

Deploy to GitHub Pages:
  1. Push to master
  2. GitHub Actions builds: npm run build
  3. GitHub Actions commits dist/ to master
  4. GitHub Pages reads dist/ from repo
  5. https://agentictheo.github.io/tischtennis-tracker/ updated
```

---

## Safety Checklist

- [ ] Only edit files in `src/` (not `dist/`)
- [ ] Never manually edit `dist/index.html`
- [ ] Run `npm run build` locally before committing
- [ ] Verify `dist/index.html` has `/tischtennis-tracker/` in asset paths
- [ ] Push to `master` (GitHub Actions auto-deploys)

---

## Troubleshooting

**Symptom:** Blank page or 404 errors  
**Fix:** Check that `dist/index.html` exists with correct asset paths

**Symptom:** Old version still showing  
**Fix:** Hard refresh browser: `Ctrl+Shift+Del` (clear cache) + `Ctrl+F5`

**Symptom:** GitHub Actions fails  
**Fix:** Check GitHub Actions log for build errors (usually missing Supabase secrets)

---

## Environment Variables

GitHub Actions needs these secrets:
- `VITE_SUPABASE_URL` = `https://iqfxysimszpncgxuaezn.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `sb_publishable_3CNkehnhKa4506UKh3PEBg_AqcFuXG9`

Set them at: `https://github.com/agentictheo/tischtennis-tracker/settings/secrets/actions`
