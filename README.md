# A Day in Your Gut — iom Bioworks

Interactive gut health game with persona cards.

## File Structure
- index.html     — Landing, name, avatar, goal
- game.html      — 4 choices + 3 interactive runners
- results.html   — Level 4 cinematic + Persona Card + Share
- recommend.html — Personalised product recommendations
- js/constants.js — ALL copy, scores, personas, product URLs
- js/state.js    — localStorage state manager
- js/scoring.js  — Persona calculation logic
- js/runner.js   — Shared runner engine
- css/style.css  — All shared styles

## To Update Content
Edit js/constants.js only — no touching game logic.

## To Add Products
Drop PNG images into assets/products/
Filenames must match keys in constants.js PRODUCTS object.

## To Add Audio
Drop MP3 files into assets/audio/
Suno.ai prompt: "Organic ambient loop, microbiome theme,
no lyrics, loop-ready, 90bpm, warm synth and nature sounds"

## To Update Make.com Webhook
In results.html, find: PLACEHOLDER_REPLACE_WITH_REAL_URL
Replace with your actual Make.com webhook URL.

## UTM Tracking
Add ?utm_source=offline_koramangala (or whatsapp_campaign,
instagram_bio, website) to your shared game URL.
All leads in Google Sheet will have channel tagged.

## Deployment
1. Push all files to GitHub repo root
2. Connect repo to Vercel
3. Vercel auto-deploys on every commit
