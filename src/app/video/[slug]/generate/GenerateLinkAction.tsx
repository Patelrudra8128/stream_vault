"use client";
import { useState, useEffect } from "react";
import { Loader2, Terminal, ArrowDownCircle } from "lucide-react";

export function GenerateLinkAction() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isDone, setIsDone] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Add realistic progress logs based on timer countdown
        const newLogs = [...logs];
        if (timeLeft === 10) newLogs.push(`[SYSTEM] Initializing request handshake...`);
        if (timeLeft === 9) newLogs.push(`[TUNNEL] Establishing secure SSL-tunnel with Vault-server...`);
        if (timeLeft === 7) newLogs.push(`[TOKEN] Bypassing third-party verification filters...`);
        if (timeLeft === 5) newLogs.push(`[MIRROR] Connecting to Premium High-Speed Mirror...`);
        if (timeLeft === 3) newLogs.push(`[DECRYPT] Extracting direct token authorization headers...`);
        if (timeLeft === 1) newLogs.push(`[OK] Authorization established. Generating redirect links...`);
        
        setLogs(newLogs);
      }, 1000);
    } else if (isGenerating && timeLeft === 0) {
      setIsDone(true);
      setIsGenerating(false);
      window.dispatchEvent(new Event('link-generated'));
    }
    return () => clearTimeout(timer);
  }, [isGenerating, timeLeft, logs]);

  const handleStart = () => {
    setIsGenerating(true);
    setLogs([`[SYSTEM] Connecting to StreamVault CDN...`]);
  };

  const progressPercent = Math.round(((10 - timeLeft) / 10) * 100);

  if (isDone) {
    return (
      <div className="flex flex-col items-center gap-2 animate-bounce">
        <ArrowDownCircle className="h-8 w-8 text-[#ff9900]" />
        <span className="text-sm font-black text-[#ff9900] uppercase tracking-wider">
          Mirror Link Ready! Scroll Down to Watch
        </span>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase">
          <span className="flex items-center gap-1.5 text-[#ff9900]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Generating Direct Tunnel...
          </span>
          <span>{progressPercent}%</span>
        </div>
        
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-[#ff9900] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Terminal logs window */}
        <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-900 font-mono text-[10px] text-zinc-500 h-28 overflow-y-auto flex flex-col gap-1 select-none">
          <div className="flex items-center gap-1 text-[#ff9900] border-b border-zinc-900 pb-1.5 mb-1 text-[9px] uppercase font-bold">
            <Terminal className="h-3 w-3" /> Console Output
          </div>
          {logs.map((log, index) => (
            <div key={index} className="truncate font-semibold text-zinc-400">
              {log}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleStart}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9900] px-16 py-4.5 text-base font-black uppercase tracking-wider text-black transition-all hover:bg-[#ff9900]/90 active:scale-95 shadow-lg shadow-[#ff9900]/10"
    >
      Generate Link
    </button>
  );
}
