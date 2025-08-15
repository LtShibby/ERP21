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

## Environment Variables

### Admin Authentication

To secure the admin panel, set the `ADMIN_LOGIN` environment variable in your Vercel deployment:

1. **Vercel Dashboard**: Go to your project settings → Environment Variables
2. **Add Variable**: 
   - Name: `ADMIN_LOGIN`
   - Value: Your secure admin password
   - Environment: Production (and Preview if desired)

**Local Development**: Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_ADMIN_LOGIN=your_secure_password_here
```

**Note**: Since this is a static export, the password will be embedded in the client-side code at build time. For production use, consider implementing server-side authentication.

### Security Considerations

The current admin authentication is client-side only and suitable for basic access control. For enhanced security:

- **Session Management**: Uses `sessionStorage` for browser session persistence
- **Rate Limiting**: Blocks login attempts after 5 failed tries
- **No Persistent Storage**: Authentication resets when browser is closed

For production environments requiring higher security, consider:
- Server-side authentication with JWT tokens
- Database-backed user management
- HTTPS-only access
- IP whitelisting

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
