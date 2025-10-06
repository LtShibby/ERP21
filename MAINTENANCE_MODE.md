# Maintenance Mode Documentation

## Overview
This project includes a global maintenance mode that can lock down the entire site and display a branded maintenance page.

## How to Enable Maintenance Mode

1. Create a `.env.local` file in the project root (if it doesn't exist)
2. Add the following line to enable maintenance mode:
   ```
   NEXT_PUBLIC_MAINTENANCE_MODE=true
   ```
3. Restart your development server or rebuild your application

## How to Disable Maintenance Mode

1. Set the environment variable to `false`:
   ```
   NEXT_PUBLIC_MAINTENANCE_MODE=false
   ```
2. Or remove the line entirely from your `.env.local` file
3. Restart your development server or rebuild your application

## What Happens When Maintenance Mode is Active

- **All routes** (including direct URLs) redirect to `/maintenance`
- The maintenance page displays:
  - Black background with electric blue (#00BFFF) and gold (#FFD700) accents
  - WozWize Owl construction image (max 400px desktop, 80% mobile)
  - "WE'RE UNDER CONSTRUCTION" headline
  - Subtext explaining the temporary offline status
  - No navbar, footer, or access to other routes

## Files Created/Modified

- `pages/maintenance.tsx` - The maintenance page component
- `middleware.ts` - Middleware that handles route redirection
- `public/images/maintenance.png` - The construction owl image (already exists)

## Environment Variables

- `NEXT_PUBLIC_MAINTENANCE_MODE` - Controls whether maintenance mode is active
  - `true` - Maintenance mode enabled
  - `false` or undefined - Maintenance mode disabled

## Testing

1. Start the development server: `npm run dev`
2. Enable maintenance mode by setting `NEXT_PUBLIC_MAINTENANCE_MODE=true`
3. Visit any route (e.g., `http://localhost:3000/about`) - should redirect to `/maintenance`
4. Disable maintenance mode by setting `NEXT_PUBLIC_MAINTENANCE_MODE=false`
5. Visit any route - should work normally
