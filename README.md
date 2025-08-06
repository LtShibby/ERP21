# ERP21 Informational Site

Static frontend-only Next.js site for ERP21, built with TailwindCSS.

## Pages

- `/` – Landing page with hero section
- `/about` – Company background and history since 1999
- `/jobs` – List of open job roles
- `/contact` – Contact details with email and WhatsApp
- `/admin` – Admin tool to manage jobs (local only)

## Dev Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build for Deployment (Vercel-ready)

```bash
npm run build
npm run export
```

Output will be in the `out/` folder, ready for Vercel deployment.

## Notes

* No backend. Jobs are read from `/data/jobs.json` or saved locally in browser storage.
* Admin page is just a convenience page for client to simulate managing job listings.
* Fully static export compatible with Vercel, Netlify, and other static hosting providers.

## Technologies Used

- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- Static Export (no server-side rendering)
informational website for ERP21 singapore
