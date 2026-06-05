"use client";
import { useState, useEffect } from "react";
import { ExternalLink, Play } from "lucide-react";

export function GenerateResult({ sourceUrl }: { sourceUrl: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsReady(true);
    window.addEventListener('link-generated', handleReady);
    return () => window.removeEventListener('link-generated', handleReady);
  }, []);

  if (!isReady) return null;

  return (
    <div className="mt-16 mb-12 flex flex-col items-center gap-6 border-t border-zinc-900 pt-16">
      <div className="min-h-[40vh] flex flex-col items-center justify-center w-full gap-4">
        
        {/* Verification Alert Badge */}
        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wide">
          <Play className="h-3.5 w-3.5 fill-current" /> Direct Streaming Token Valid
        </div>

        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#ff9900] px-14 py-5 text-lg font-black uppercase tracking-wider text-black transition-all hover:bg-[#ff9900]/90 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#ff9900]/15"
        >
          Watch on Source Host <ExternalLink className="h-5 w-5" />
        </a>
        
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider max-w-sm text-center leading-relaxed mt-2">
          Note: This redirects to external verified server partners. Make sure to keep your security configuration active.
        </p>
      </div>
    </div>
  );
}
