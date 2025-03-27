import type { Metadata } from "next";
import { headingFont } from "../../public/fonts/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";


export const metadata: Metadata = {
  title: "Athlete's Resilience Center",
  description: "Find your performance arc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // per next-themes docs
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${headingFont.className} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
            {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
