import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import '../styles/globals.css';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
});


const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope', 
});

export const metadata: Metadata = {
  title: "L'Abricot - Gestion de projets",
  description: "Application SaaS de gestion de tâches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}