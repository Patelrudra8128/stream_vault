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
    return <span className="text-lg font-semibold text-blue-500">Scroll to bottom</span>;
  }

  if (isGenerating) {
    return <span className="text-lg font-semibold text-slate-300 animate-pulse">{timeLeft} seconds remaining...</span>;
  }

  return (
    <button
      onClick={() => setIsGenerating(true)}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-12 py-4 text-lg font-bold text-white transition-all hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/10"
    >
      Generate Link
    </button>
  );
}
