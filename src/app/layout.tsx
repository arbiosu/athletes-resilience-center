import type { Metadata } from 'next';
import { JETBRAINS, LORA } from '../../public/fonts/font';
import { ThemeProvider } from '@/components/theme-provider';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: "Athlete's Resilience Center | Find Your Performance Arc",
  description:
    'Normalizing the conversation around mental performance in sports, coaching, and the transitions athletes face after their careers',
  keywords: [
    'athlete',
    'resilience',
    'performance',
    'mental training',
    'sports psychology',
    'sports podcast',
    'coaching',
  ],
  openGraph: {
    title: "Athlete's Resilience Center",
    description: 'Find Your Performance Arc',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${JETBRAINS.variable} ${LORA.variable} antialiased`}>
        <ThemeProvider
          attribute={'class'}
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
