"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AgeWarningModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const pathname = usePathname();

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number = 365) => {
    if (typeof document === "undefined") return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
  };

  useEffect(() => {
    if (pathname === "/terms" || pathname === "/privacy") {
      setIsOpen(false);
      document.body.style.overflow = "auto";
      return;
    }

    const hasAcceptedAge = getCookie("streamvault_age_accepted") === "true";
    if (hasAcceptedAge) {
      setIsOpen(false);
      // Let CookiePopup know it can display
      window.dispatchEvent(new CustomEvent("age-resolved"));
    } else {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, [pathname]);

  const handleAccept = () => {
    setCookie("streamvault_age_accepted", "true", 365);
    setIsOpen(false);
    document.body.style.overflow = "auto";
    // Let CookiePopup know it can display
    window.dispatchEvent(new CustomEvent("age-resolved"));
  };

  const handleDecline = () => {
    window.location.href = "https://google.com";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop Blur */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 shadow-2xl shadow-black/90"
          >
            {/* Top accent line */}
            <div className="h-[3px] w-full bg-[#ff9900]" />
            
            <div className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#ff9900]/10 p-4">
                  <AlertTriangle className="h-12 w-12 text-[#ff9900]" />
                </div>
              </div>

              <h2 className="mb-3 text-center text-2xl font-black text-white tracking-tight uppercase">
                18+ Adult Content Warning
              </h2>
              
              <p className="mb-6 text-center text-xs text-zinc-400 leading-relaxed font-semibold">
                This website contains index listings of content that may be inappropriate for minors. 
                By entering, you confirm that you are at least 18 years of age or the age of majority 
                in your jurisdiction, and you agree to view such content.
              </p>

              {/* Terms and Conditions Checkbox */}
              <label className="mb-6 flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-[#ff9900] accent-[#ff9900] focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-zinc-400 select-none leading-relaxed transition-colors group-hover:text-zinc-300 font-medium">
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-[#ff9900] font-bold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-[#ff9900] font-bold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDecline}
                  className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 py-3 text-xs font-black uppercase tracking-wider text-zinc-400 transition-all hover:bg-zinc-900 hover:text-white"
                >
                  Leave
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!isAgreed}
                  className="flex-1 rounded-xl bg-[#ff9900] py-3 text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-[#ff9900]/95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#ff9900]/10"
                >
                  Enter
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
