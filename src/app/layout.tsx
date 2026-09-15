import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { TournamentProvider } from '@/context/TournamentContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://educated-battle.vercel.app'),
  title: 'EDUCATED GAMER ? Free Fire Esports Arena Pakistan',
  description: "Pakistan's premier esports platform for Free Fire & Free Fire MAX tournaments. Compete in daily custom rooms, win real PKR cash prizes, and build your gamer rank.",
  keywords: ['Educated Gamer', 'Free Fire Tournament Pakistan', 'Free Fire MAX', 'Esports Pakistan', 'PKR Cash Prizes', 'Custom Rooms'],
  openGraph: {
    title: 'EDUCATED GAMER ARENA ? Free Fire Esports Pakistan',
    description: 'Compete in daily Free Fire tournaments, earn per-kill PKR rewards & cash out instantly via JazzCash.',
    type: 'website',
    images: ['/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="bg-background text-slate-100 antialiased selection:bg-crimson/30 selection:text-crimson-light min-h-screen flex flex-col">
        <AuthProvider>
          <TournamentProvider>
            {children}
          </TournamentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
