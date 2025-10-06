import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  // If maintenance mode is enabled and user is not already on maintenance page
  if (maintenanceMode && request.nextUrl.pathname !== '/maintenance' && request.nextUrl.pathname !== '/maintenance/') {
    // Redirect to maintenance page
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }
  
  // If maintenance mode is disabled and user is on maintenance page, redirect to home
  if (!maintenanceMode && (request.nextUrl.pathname === '/maintenance' || request.nextUrl.pathname === '/maintenance/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Continue with normal request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|data).*)',
  ],
};
