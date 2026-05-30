"use client";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

export function GenerateResult({ sourceUrl }: { sourceUrl: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsReady(true);
    window.addEventListener('link-generated', handleReady);
    return () => window.removeEventListener('link-generated', handleReady);
  }, []);

  if (!isReady) return null;

  return (
    <div className="mt-20 mb-12 flex flex-col items-center gap-8 border-t border-white/10 pt-12">
      <div className="min-h-[50vh] flex flex-col items-center justify-end w-full pb-12">
         <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-12 py-6 text-xl font-bold text-white transition-all hover:scale-110 shadow-2xl shadow-neon-blue/40"
         >
            Watch on Source Site <ExternalLink className="h-6 w-6" />
         </a>
      </div>
    </div>
  );
}
