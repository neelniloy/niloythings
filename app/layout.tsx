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
  metadataBase: new URL("https://niloythings.pages.dev"),
  title: "Niloy Kumar Sarker | Lead Software Engineer & Product Builder",
  description: "Lead Software Engineer & Product Builder. Building production mobile systems, offline-first architectures, and scalable digital products with Flutter, Kotlin, and modern web.",
  keywords: ["Niloy Kumar Sarker", "Lead Software Engineer", "Mobile Engineer", "Flutter Developer", "Android Developer", "Product Builder", "Futuredesh"],
  authors: [{ name: "Niloy Kumar Sarker" }],
  openGraph: {
    title: "Niloy Kumar Sarker | Lead Software Engineer & Product Builder",
    description: "Building production mobile systems and shipping useful things.",
    url: "https://niloythings.pages.dev",
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
    title: "Niloy Kumar Sarker | Lead Software Engineer & Product Builder",
    description: "Building production mobile systems and shipping useful things.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="antialiased selection:bg-primary selection:text-white" suppressHydrationWarning>
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 w-full overflow-x-hidden selection:bg-primary selection:text-white pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
