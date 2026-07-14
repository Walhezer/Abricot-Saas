import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Retrieve authentication token from cookies
  const token = request.cookies.get('abricot_token')?.value;
  
  // Extract the requested path
  const { pathname } = request.nextUrl;

  // Handle root path redirection
  if (pathname === '/') {
    // Redirect to dashboard if authenticated, otherwise to login
    const redirectUrl = token ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Define route categories
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isDashboardPage = pathname.startsWith('/dashboard') || pathname.startsWith('/kanban') || pathname.startsWith('/projects') || pathname.startsWith('/account');

  // Case 1: Redirect unauthenticated users away from protected routes
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Case 2: Redirect authenticated users away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Proceed with the request if no conditions match
  return NextResponse.next();
}

// Configure paths where the proxy applies (excluding static assets for performance)
export const config = {
  matcher: ['/','/dashboard/:path*', '/kanban/:path*', '/projects/:path*', '/account/:path*', '/login', '/register'],
};