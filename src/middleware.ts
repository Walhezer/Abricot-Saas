import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware for route protection and redirection.
 * Verifies the authentication cookie to secure private routes and redirects logged-in users away from auth pages.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('abricot_token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const redirectUrl = token ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  const isProtectedPage =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/kanban') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/account');

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

/**
 * Middleware configuration defining the exact route paths to intercept.
 * Optimizes performance by ensuring the middleware only runs on necessary routes.
 */
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/kanban/:path*',
    '/projects/:path*',
    '/account/:path*',
    '/login',
    '/register',
  ],
};