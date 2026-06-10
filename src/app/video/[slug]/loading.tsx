import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 bg-[#0b0f19]">
      <div className="relative flex items-center justify-center">
        {/* Outer pulse effect */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-[#ff9900]/10 border border-[#ff9900]/25" />
        
        {/* Rotating Spinner */}
        <Loader2 className="h-10 w-10 animate-spin text-[#ff9900] relative z-10" />
      </div>
      
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-[#ff9900]">
          Loading Video Details
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Preparing secure high-speed stream
        </p>
      </div>
    </div>
  );
}
