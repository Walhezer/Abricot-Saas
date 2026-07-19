import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre espace personnel pour retrouver votre tableau de bord et piloter vos projets.',
};

/**
 * Renders the layout wrapper and metadata for the login page.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}