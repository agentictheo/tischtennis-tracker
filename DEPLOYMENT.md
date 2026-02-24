# Deployment Guide - Tischtennis Tracker

## 🚀 Quick Deployment to Netlify

### Option 1: GitHub Auto-Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   # From the tischtennis-tracker directory
   git remote add origin https://github.com/YOUR_USERNAME/tischtennis-tracker.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Visit https://app.netlify.com/sites
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your `tischtennis-tracker` repo
   - Build settings should auto-detect:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Auto-deployment**
   - Every push to main will trigger a new build
   - Live URL provided immediately

### Option 2: Netlify CLI Deploy

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Login to Netlify
netlify login

# From tischtennis-tracker directory
netlify deploy --prod --dir=dist
```

### Option 3: Netlify UI Direct Upload

1. Visit https://app.netlify.com/sites
2. Drag and drop the `dist` folder
3. Site deployed instantly

## 🔌 Adding Supabase

### Step 1: Create Supabase Project
1. Visit https://supabase.com and sign up/login
2. Click "New Project"
3. Select a region (use EU for GDPR compliance)
4. Copy your project URL and API key

### Step 2: Set Up Database Schema
1. In Supabase dashboard, go to SQL Editor
2. Create a new query
3. Copy-paste the contents of `SUPABASE_SCHEMA.sql`
4. Execute the SQL

### Step 3: Configure Environment Variables

In Netlify:
1. Go to Site settings → Build & deploy → Environment
2. Add these environment variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Trigger a new deploy (push to GitHub or click "Deploy site" in Netlify)

### Step 4: Local Testing (Optional)
```bash
# Update .env.local with your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Restart dev server
npm run dev
```

## 📋 Pre-Deployment Checklist

- [ ] App builds locally: `npm run build` ✅
- [ ] No console errors: `npm run dev` ✅
- [ ] Sample game created and loads ✅
- [ ] Stats calculations verified ✅
- [ ] Responsive design tested on mobile
- [ ] Environment variables configured (if using Supabase)
- [ ] Custom domain configured (optional)

## 🔐 Security Notes

- Public anon key from Supabase is safe (no sensitive data)
- Enable RLS (Row Level Security) policies in Supabase for production
- Consider adding user authentication if storing personal stats

## 🌍 Live Deployment Steps (Final)

```bash
# 1. Final commit
git add -A
git commit -m "Production ready: all features tested"

# 2. Push to GitHub
git push origin main

# 3. Wait for Netlify auto-build to complete
# Monitor at: app.netlify.com/sites/YOUR_SITE_NAME

# 4. Your app is now live! 🎉
```

## 📊 Monitoring

- **Build logs**: app.netlify.com/sites/YOUR_SITE_NAME/deploys
- **Site analytics**: In Netlify dashboard
- **Error tracking**: Browser console (F12)

## 🆘 Troubleshooting

### Build fails after pushing
- Check Netlify build logs for errors
- Ensure all environment variables are set
- Try `npm run build` locally first

### Data not persisting
- Check browser's localStorage (DevTools → Application → LocalStorage)
- If using Supabase, verify credentials are correct
- Check RLS policies aren't blocking writes

### Styling looks broken
- Clear cache: Shift+F5 or Ctrl+Shift+R
- Check CSS imports in components
- Verify `dist/assets/index-*.css` in build

## 🎉 Success!

Your Tischtennis Tracker is live! Share the Netlify URL with players and start logging games.

**Live URL**: `https://YOUR-SITE-NAME.netlify.app`

**Admin Tips**:
- Monitor build health in Netlify dashboard
- Keep GitHub repo up-to-date
- Backup data regularly if using Supabase

---

Need help? Check README.md for architecture details.
