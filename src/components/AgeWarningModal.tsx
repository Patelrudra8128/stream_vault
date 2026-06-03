"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function AgeWarningModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

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
    const hasAcceptedAge = getCookie("streamvault_age_accepted") === "true";
    if (hasAcceptedAge) {
      setIsOpen(false);
      // Let CookiePopup know it can display
      window.dispatchEvent(new CustomEvent("age-resolved"));
    } else {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-neon-pink/20"
          >
            {/* Top accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue" />
            
            <div className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-red-500/10 p-4">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
              </div>

              <h2 className="mb-2 text-center text-2xl font-bold text-white">
                18+ Adult Content Warning
              </h2>
              
              <p className="mb-6 text-center text-sm text-gray-400">
                This website contains index listings of content that may be inappropriate for minors. 
                By entering, you confirm that you are at least 18 years of age or the age of majority 
                in your jurisdiction, and you agree to view such content.
              </p>

              {/* Terms and Conditions Checkbox */}
              <label className="mb-6 flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-neon-pink rounded border-white/10 bg-white/5 text-neon-pink focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-gray-400 select-none leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-neon-blue hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-neon-pink hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDecline}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
                >
                  Leave
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!isAgreed}
                  className="flex-1 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
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
