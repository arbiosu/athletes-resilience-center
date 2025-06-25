import { JetBrains_Mono, Lora } from 'next/font/google';

export const JETBRAINS = JetBrains_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const LORA = Lora({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});
