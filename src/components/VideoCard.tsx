"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/data/videos";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/video/${video.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800/80 transition-all duration-300 hover:border-blue-500/35 hover:-translate-y-1 hover:bg-slate-900/85 hover:shadow-lg"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/75 px-2 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md border border-slate-800">
          {video.duration}
        </div>
        <div className="absolute left-2.5 top-2.5 rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase text-white shadow-md">
          {video.category}
        </div>

        {/* Center Play Icon Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-md scale-75 transition-transform duration-300 group-hover:scale-100 hover:bg-blue-500">
            <Play className="h-5 w-5 fill-white translate-x-[1px]" />
          </div>
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-4 bg-slate-950/20">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-blue-500">
          {video.title}
        </h3>
        
        {/*<div className="flex items-center justify-between text-xs text-gray-400">*/}
        {/*  <div className="flex items-center gap-1.5">*/}
        {/*    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">*/}
        {/*      {video.sourceName.charAt(0)}*/}
        {/*    </span>*/}
        {/*    {video.sourceName}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </Link>
  );
}
