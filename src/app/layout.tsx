import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeWarningModal from "@/components/AgeWarningModal";
import CookiePopup from "@/components/CookiePopup";
import AdBlockWarningModal from "@/components/AdBlockWarningModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamVault - Premium Video Directory",
  description: "Discover and explore the best video content on the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
    <head>
        <script src="https://quge5.com/88/tag.min.js" data-zone="244435" async data-cfasync="false"></script>
    </head>
    <body className={`${inter.className} min-h-screen bg-[#0b0f19] text-slate-100 antialiased`}>
        <AdBlockWarningModal />
        <AgeWarningModal />
        <CookiePopup />
        <Suspense fallback={<div className="h-16 w-full bg-[#0b0f19]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
