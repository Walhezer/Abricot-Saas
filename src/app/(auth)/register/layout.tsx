import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription',
  description: 'Créez votre compte gratuitement et commencez à gérer vos projets efficacement.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}