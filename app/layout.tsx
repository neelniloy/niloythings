import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-white`} suppressHydrationWarning>
        {/* Ambient Glow Orbs */}
        <div className="glow-orb top-[-10%] left-[-10%] bg-primary/20" />
        <div className="glow-orb bottom-[-10%] right-[-10%] bg-primary/10" />

        <Navbar />
        <MotionProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-16 overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
