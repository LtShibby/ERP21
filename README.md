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
```

The app will be deployed as a serverless Next.js application on Vercel with API routes enabled.

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
ADMIN_LOGIN=your_secure_password_here
```

**Note**: The password is now validated server-side via API routes and never exposed to the client. Authentication uses secure HTTP-only cookies.

### Security Considerations

The admin authentication now uses server-side validation with enhanced security:

- **Server-Side Validation**: Password is never exposed to the client
- **HTTP-Only Cookies**: Secure cookie-based session management
- **Rate Limiting**: IP-based rate limiting (5 attempts per 15 minutes)
- **Session Duration**: 12-hour session with secure cookie configuration
- **CSRF Protection**: SameSite=Lax cookie policy for basic protection

Security features:
- `httpOnly: true` - Cookies cannot be accessed via JavaScript
- `secure: true` in production - HTTPS-only in production
- `sameSite: "lax"` - Basic CSRF protection
- Server-side rate limiting per IP address

## Notes

* Jobs are read from `/data/jobs.json` or saved locally in browser storage.
* Admin page uses server-side authentication via API routes.
* Deployed as a serverless Next.js application on Vercel with API routes enabled.

## Technologies Used

- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- Static Export (no server-side rendering)
informational website for ERP21 singapore
