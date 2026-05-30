"use client";
import { useState, useEffect } from "react";

export function GenerateLinkAction() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isGenerating && timeLeft === 0) {
      setIsDone(true);
      setIsGenerating(false);
      window.dispatchEvent(new Event('link-generated'));
    }
    return () => clearTimeout(timer);
  }, [isGenerating, timeLeft]);

  if (isDone) {
    return <span className="text-lg font-bold text-neon-pink">Scroll to bottom</span>;
  }

  if (isGenerating) {
    return <span className="text-lg font-bold text-neon-blue">{timeLeft} seconds</span>;
  }

  return (
    <button
      onClick={() => setIsGenerating(true)}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 shadow-xl shadow-neon-blue/25"
    >
      Generate Link
    </button>
  );
}
