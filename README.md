# Ternakin.ai — website

Marketing site and dashboard demo for **Ternakin.ai**, precision livestock monitoring for Indonesia. Bilingual (ID default, EN).

**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts. There is no database. Form leads go to Google Sheets.

## Pages

| Route (`/id/...` or `/en/...`) | Content |
|---|---|
| `/` | Hero, problem stats (cited), how it works, live dashboard demo, results (Halter benchmark + pilot targets), use cases, differentiators, credit/trial CTA, FAQ |
| `/produk` | TernakTag, village gateway, WhatsApp bot, dashboard |
| `/solusi/[slug]` | 7 use cases: sapi-potong, sapi-perah, peternak-rakyat, kambing-domba, pemerintah-dinas, bank-asuransi, offtaker-rph |
| `/demo` | Interactive dashboard demo with 9 tabs (simulated data) |
| `/keunggulan` | Differentiators and comparison against Halter, Nofence, Ceres Tag, CattleEye and local players |
| `/data-integrasi` | Live BMKG → THI and BPS widgets, integration status (live / snapshot / roadmap) |
| `/riset` | Cited research (Indonesia 2023–2026 + global) |
| `/kredit` | 30-day trial, installments, KUR pathway, AUTS, KUR simulator, apply form |
| `/uji-coba` | Trial signup |
| `/harga` | "Coming soon" + waitlist |
| `/tentang`, `/kontak`, `/privasi`, `/syarat` | Company & legal (draft) |

Content lives in `src/lib/content/*` and `src/dictionaries/ui.ts`. Every string is `{ id, en }`.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000 → redirects to /id
```

## Environment

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |
| `SHEETS_WEBHOOK_URL` | Google Apps Script web-app URL. If empty, leads are only logged |
| `SHEETS_WEBHOOK_SECRET` | Shared secret checked by the Apps Script |
| `BPS_API_KEY`, `BPS_VAR_ID` | Optional live BPS data. Without them the BPS 2024 snapshot is shown |

### Google Sheets setup
See `docs/google-apps-script.gs`. Paste it into a Sheet's Apps Script, set the `SECRET` script property, deploy as a web app (access: Anyone), and put the `/exec` URL in `SHEETS_WEBHOOK_URL`. Each form type gets its own tab.

## Deploy to a VPS (Docker)

**Quick (no domain, review on port 8080).** Run as root on the VPS. It's idempotent, so re-run it to update:

```bash
curl -fsSL https://raw.githubusercontent.com/WassupXes/Website/claude/amazing-hopper-u1rz7c/deploy/vps-install.sh | bash
```

It installs Docker and nginx if they're missing, runs the app on `127.0.0.1:3010` and serves it at `http://<ip>:8080`. Existing sites on 80/443 are not touched.

**With a domain:**

```bash
# on the VPS (Docker + nginx installed)
git clone https://github.com/WassupXes/Website.git /opt/ternakin && cd /opt/ternakin
cp .env.example .env && nano .env
./deploy/deploy.sh main                 # builds & runs on 127.0.0.1:3010
sudo cp deploy/nginx.conf /etc/nginx/sites-available/ternakin
sudo ln -s /etc/nginx/sites-available/ternakin /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d ternakin.ai -d www.ternakin.ai
```

Each later deploy is just `./deploy/deploy.sh main`. The image is about 150 MB (Next.js standalone output). It runs comfortably on 1 vCPU / 1 GB RAM. Building on very small VPSes may need swap.

## Data honesty rules
- **Live**: BMKG forecast API, BPS WebAPI. Both fall back to labelled data when unreachable.
- **Snapshot**: Bapanas food prices (no public API).
- **Roadmap**: iSIKHNAS, Satu Data Pertanian (no public API).
- Ternakin's own efficiency numbers are labelled *target pilot / proyeksi*. Dashboard data is simulated.
