"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/data/videos";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/video/${video.slug}`} className="group relative block overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-neon-purple/20">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {video.duration}
        </div>
        <div className="absolute left-2 top-2 rounded bg-gradient-to-r from-neon-purple to-neon-blue px-2 py-1 text-xs font-bold text-white shadow-lg">
          {video.category}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-white backdrop-blur-md border border-white/20">
            <Play className="h-4 w-4 fill-white" /> View Details
          </div>
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-neon-blue">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">
              {video.sourceName.charAt(0)}
            </span>
            {video.sourceName}
          </div>
        </div>
      </div>
    </Link>
  );
}
