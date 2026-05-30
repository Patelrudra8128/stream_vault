import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
    <head>
        <script src="https://quge5.com/88/tag.min.js" data-zone="244435" async data-cfasync="false"></script>
    </head>
    <body className={`${inter.className} min-h-screen bg-[#050505] antialiased selection:bg-neon-pink/30`}>
        <AgeWarningModal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
