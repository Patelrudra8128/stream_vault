"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdBlockWarningModal() {
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/terms" || pathname === "/privacy") {
      setIsAdBlockActive(false);
      document.body.style.overflow = "auto";
      return;
    }

    const checkAdBlock = async () => {
      // 1. DOM Check: Append dummy element with typical ad-related class names
      const dummy = document.createElement("div");
      dummy.className = "adsbox ads ad-banner ad-placement doubleclick-ad sponsored-ad";
      dummy.setAttribute(
        "style",
        "position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px;"
      );
      document.body.appendChild(dummy);

      // Wait a moment for ad blockers to intercept and process DOM elements
      await new Promise((resolve) => setTimeout(resolve, 300));

      let isBlocked = false;
      if (
        dummy.offsetHeight === 0 ||
        dummy.clientWidth === 0 ||
        window.getComputedStyle(dummy).display === "none" ||
        window.getComputedStyle(dummy).visibility === "hidden"
      ) {
        isBlocked = true;
      }

      document.body.removeChild(dummy);

      // 2. Fetch Check: Probe the ads zone URL (or fallback standard ad host)
      if (!isBlocked) {
        try {
          // Probe the tag script already defined in layout.tsx
          const url = "https://quge5.com/88/tag.min.js";
          await fetch(url, {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-store",
          });
        } catch {
          isBlocked = true;
        }
      }

      if (isBlocked) {
        if (window.location.pathname !== "/terms" && window.location.pathname !== "/privacy") {
          setIsAdBlockActive(true);
          document.body.style.overflow = "hidden";
        }
      }
    };

    checkAdBlock();
  }, [pathname]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isAdBlockActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl"
        >
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/80"
          >
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-blue-600" />

            <div className="flex flex-col items-center text-center">
              <div className="mb-5 rounded-full bg-red-500/10 p-4 text-red-500">
                <ShieldAlert className="h-12 w-12 animate-pulse" />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-white tracking-tight">
                Ad Blocker Detected
              </h2>

              <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                We noticed that you are using an ad blocker. To continue exploring StreamVault, please disable your ad blocker for this website and refresh the page.
              </p>

              <button
                onClick={handleRefresh}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/10"
              >
                I have disabled it (Refresh)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
