import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. On récupère le token dans les cookies
  const token = request.cookies.get('abricot_token')?.value;
  
  // 2. On récupère l'URL sur laquelle l'utilisateur essaie d'aller
  const { pathname } = request.nextUrl;

  // 3. Définition des routes
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isDashboardPage = pathname.startsWith('/dashboard') || pathname.startsWith('/kanban') || pathname.startsWith('/projects');

  // CAS 1 : L'utilisateur n'a PAS de token et essaie d'accéder au SaaS (Dashboard, Kanban...)
  if (!token && isDashboardPage) {
    // On le redirige immédiatement vers la page de connexion
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // CAS 2 : L'utilisateur A un token valide mais essaie d'aller sur /login ou /register
  if (token && isAuthPage) {
    // Inutile de se reconnecter, on l'envoie sur le dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si tout est OK, on laisse la requête continuer normalement
  return NextResponse.next();
}

// Le "matcher" permet de dire à Next.js sur quelles routes le middleware doit s'exécuter
// On exclut les fichiers statiques (images, styles) pour ne pas ralentir le site
export const config = {
  matcher: ['/dashboard/:path*', '/kanban/:path*', '/projects/:path*', '/login', '/register'],
};