"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookiePopup() {
  const [isVisible, setIsVisible] = useState(false);

  const setCookie = (name: string, value: string, days: number = 365) => {
    if (typeof document === "undefined") return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
  };

  const deleteCookie = (name: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  };

  useEffect(() => {
    const handleAgeResolved = () => {
      const hasAcceptedCookies = sessionStorage.getItem("streamvault_cookies_accepted");
      if (!hasAcceptedCookies) {
        setIsVisible(true);
      }
    };

    // If age is already accepted in cookies, show the cookie popup immediately on mount
    const hasAcceptedAge = typeof document !== "undefined" && document.cookie.includes("streamvault_age_accepted=true");
    if (hasAcceptedAge) {
      handleAgeResolved();
    }

    window.addEventListener("age-resolved", handleAgeResolved);
    return () => {
      window.removeEventListener("age-resolved", handleAgeResolved);
    };
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("streamvault_cookies_accepted", "true");
    setIsVisible(false);
    setCookie("streamvault_age_accepted", "true", 365);
  };

  const handleDecline = () => {
    sessionStorage.setItem("streamvault_cookies_accepted", "false");
    setIsVisible(false);
    deleteCookie("streamvault_age_accepted");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm sm:bottom-8 sm:right-8 sm:w-full"
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-2xl shadow-black/90">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[#ff9900]" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-[#ff9900]/10 p-2.5 text-[#ff9900]">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="mb-1.5 text-[15px] font-black text-white tracking-tight uppercase">We use cookies</h3>
                <p className="mb-5 text-[11px] text-zinc-400 leading-relaxed font-semibold">
                  We use cookies to enhance your browsing experience and analyze our traffic. 
                </p>
                
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleAccept}
                    className="flex-1 rounded-xl bg-[#ff9900] py-2.5 text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-[#ff9900]/95 active:scale-95 shadow-md shadow-[#ff9900]/10"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 rounded-xl border border-zinc-850 bg-zinc-900/50 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-400 transition-colors hover:bg-zinc-900 active:scale-95"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
