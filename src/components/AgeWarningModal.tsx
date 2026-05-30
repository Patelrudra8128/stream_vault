"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function AgeWarningModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("streamvault_age_accepted");
    if (!hasAccepted) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("streamvault_age_accepted", "true");
    setIsOpen(false);
    document.body.style.overflow = "auto";
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
              
              <p className="mb-8 text-center text-sm text-gray-400">
                This website contains index listings of content that may be inappropriate for minors. 
                By entering, you confirm that you are at least 18 years of age or the age of majority 
                in your jurisdiction, and you agree to view such content.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDecline}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
                >
                  Leave
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink py-3 text-sm font-bold text-white transition-transform hover:scale-105"
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
