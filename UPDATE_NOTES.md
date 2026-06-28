# TestNova Website — Update Notes

This commit upgrades the QA Training Hub website with:

## What changed

| Area | Change |
|------|--------|
| **Mobile** | Hamburger menu, responsive grid, mobile-friendly forms |
| **Topic checkboxes** | Each learning topic is numbered and has an inline checkbox in front of its title |
| **Game-style progress** | Replaces plain "0 / 30 · 0%" badge with a gamified XP bar, Level pill, level-up toast, and confetti when sections are completed |
| **Registration** | New `register.html` form (Name, Mobile, Email, Course, Experience, Source, Remarks) — emails each submission to **admin@testnova.in** |
| **Site-wide CTA** | Floating "🚀 Register Now" button + "Register" link in every page's top nav |

## One-time setup — Web3Forms (2 minutes)

The registration form uses **Web3Forms** (free, unlimited, no backend needed — perfect for GitHub Pages).

1. Go to **https://web3forms.com**
2. Enter `admin@testnova.in` → click **"Create Access Key"**
3. Open the inbox of `admin@testnova.in` → click the verification link from Web3Forms
4. Copy the access key shown (UUID-style string)
5. Open `register.html` in your repo, find this line near the bottom:

   ```js
   var WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_KEY";
   ```

6. Replace the placeholder with your access key:

   ```js
   var WEB3FORMS_ACCESS_KEY = "abcd1234-ef56-7890-abcd-ef1234567890";
   ```

7. Commit & push. Every registration will now arrive in **admin@testnova.in** within seconds.

> **Free tier**: ~250 submissions/month soft cap. Plenty for early stage. If you grow past that, you can upgrade or switch to the FastAPI backend (see below).

## How registrations look in your inbox

Each submission arrives as an email titled e.g.
`New Registration: Wasim (Playwright with TypeScript)`

with the candidate's details laid out. You can **Reply** directly to the candidate (Web3Forms sets `Reply-To` to their email).

For the admin tracking columns you mentioned (**Called?**, **Interested?**, **Follow-up Date**, **Joined?**), simplest workflow:

1. Create a Google Sheet: **TestNova Leads**
2. Columns: Date, Name, Mobile, Email, Course, Experience, Source, Called?, Interested?, Follow-up Date, Joined?, Remarks
3. When an email comes in, paste the candidate row in — fill the admin columns as you contact them.

> Want fully automated logging into a Google Sheet (no copy-paste)? Reply "set up Sheets sync" and I'll wire it up via a free Google Apps Script.

## (Optional) Switching to the FastAPI backend instead of Web3Forms

If you ever want full control / unlimited volume / your own Gmail SMTP App Password, deploy the FastAPI backend (in the `backend/` folder of the dev environment) on **Render** or **Railway** free tier:

1. Create a new Web Service on render.com → connect this repo (or a separate backend repo)
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Add env vars: `SMTP_USER`, `SMTP_PASS` (Gmail App Password), `NOTIFY_EMAIL=admin@testnova.in`, `MONGO_URL`, `DB_NAME`
5. Replace the Web3Forms block in `register.html` with a `fetch('https://your-backend.onrender.com/api/register', ...)` call

## Files touched in this update

- `register.html` (new)
- `progress.js` (new — game-style XP/level/confetti)
- `site.js` (new — hamburger menu + floating Register button injection)
- `styles.css` (updated — mobile-friendly + game UI + register styles)
- `index.html`, `selenium.html`, `Selenium Basics.html`, `hybrid.html`, `playwright.html`, `api.html`, `rest.html`, `cucumber.html`, `jenkins.html`, `master.html` — all received the `Register` nav link and the `site.js` script tag

`.git` history preserved — you can `git push` after committing.
