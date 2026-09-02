import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Niloy Kumar Sarker | Product Technologist & CTO",
  description: "Product Technologist & CTO at Futuredesh Ltd. Building production mobile systems, AgriTech innovations, and crafting digital ventures with Flutter, Kotlin, and React.",
  keywords: ["Niloy Kumar Sarker", "CTO", "Product Technologist", "Software Engineer", "Flutter Developer", "AgriTech", "Futuredesh"],
  authors: [{ name: "Niloy Kumar Sarker" }],
  openGraph: {
    title: "Niloy Kumar Sarker | Product Technologist & CTO",
    description: "Building production mobile systems and shipping useful things.",
    url: "https://niloythings.com",
    siteName: "Niloy Things",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Niloy Kumar Sarker Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niloy Kumar Sarker | Product Technologist & CTO",
    description: "Building production mobile systems and shipping useful things.",
    creator: "@niloythings",
    images: ["/og-image.jpg"],
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-primary selection:text-white" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full overflow-x-hidden selection:bg-primary selection:text-white pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
