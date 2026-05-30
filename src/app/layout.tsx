import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeWarningModal from "@/components/AgeWarningModal";

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
      <body className={`${inter.className} min-h-screen bg-[#050505] antialiased selection:bg-neon-pink/30`}>
        <AgeWarningModal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
