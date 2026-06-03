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
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl shadow-black/80">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-blue-600" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-blue-500/10 p-2.5 text-blue-500">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="mb-1.5 text-lg font-bold text-white tracking-tight">We use cookies</h3>
                <p className="mb-5 text-sm text-slate-400 leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze our traffic. 
                </p>
                
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleAccept}
                    className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/10"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 active:scale-95"
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
