import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast Quick Whipz | Midwest Car Sharing",
  description:
    "The Midwest's premier peer-to-peer car sharing platform. Rent unique cars from local hosts with transparent pricing and 24/7 support.",
  keywords: [
    "car rental",
    "car sharing",
    "Midwest",
    "Chicago",
    "Detroit",
    "Milwaukee",
    "peer-to-peer",
    "rent a car",
  ],
  openGraph: {
    title: "Fast Quick Whipz | Midwest Car Sharing",
    description:
      "Rent unique cars from local hosts across the Midwest. Transparent pricing, 24/7 support.",
    type: "website",
    locale: "en_US",
    siteName: "Fast Quick Whipz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
