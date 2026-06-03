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
    <div className="mt-20 mb-12 flex flex-col items-center gap-8 border-t border-slate-800 pt-12">
      <div className="min-h-[50vh] flex flex-col items-center justify-end w-full pb-12">
         <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-12 py-6 text-xl font-extrabold text-white transition-all hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/10"
         >
            Watch on Source Site <ExternalLink className="h-6 w-6" />
         </a>
      </div>
    </div>
  );
}
