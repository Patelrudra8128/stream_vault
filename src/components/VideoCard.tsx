"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { isVideoUrl, type Video } from "@/data/videos";

export default function VideoCard({ video }: { video: Video }) {
  const isVideo = isVideoUrl(video.thumbnail);
  
  // Construct the array of images to cycle through
  const previewImages = video.gallery && video.gallery.length > 0
    ? [video.thumbnail, ...video.gallery.filter((img) => img !== video.thumbnail)]
    : [video.thumbnail];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isVideo || previewImages.length <= 1) return;

    // Stagger the start time randomly between 0 and 1500ms to make the page feel alive and natural
    const startDelay = Math.random() * 1500;
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % previewImages.length);
      }, 2000);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isVideo, previewImages.length]);

  return (
    <Link
      href={`/video/${video.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800/80 transition-all duration-300 hover:border-blue-500/35 hover:-translate-y-1 hover:bg-slate-900/85 hover:shadow-lg"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {isVideo ? (
          <motion.video
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={video.thumbnail}
            className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={previewImages[currentImageIndex]}
            alt={video.title}
            className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        
        {/* Badges */}
        <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/75 px-2 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md border border-slate-800">
          {video.duration}
        </div>
        <div className="absolute left-0 top-2 bg-blue-600 px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase text-white shadow-md">
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
      </div>
    </Link>
  );
}
