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
  const [isHovered, setIsHovered] = useState(false);

  // Fallback static thumbnail for video elements when not hovered
  const staticPlaceholder = video.gallery && video.gallery.length > 0
    ? video.gallery[0]
    : video.thumbnail;

  useEffect(() => {
    if (isVideo || previewImages.length <= 1 || !isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % previewImages.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isVideo, previewImages.length, isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <Link
      href={`/video/${video.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative block overflow-hidden rounded-2xl bg-zinc-900/40 border border-zinc-800/80 transition-all duration-300 hover:border-[#ff9900]/30 hover:-translate-y-1 hover:bg-zinc-900/85 hover:shadow-lg"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        {isVideo ? (
          isHovered ? (
            <motion.video
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={video.thumbnail}
              className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={staticPlaceholder}
              alt={video.title}
              className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
            />
          )
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
        <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/75 px-2 py-1 text-xs font-semibold text-zinc-300 backdrop-blur-md border border-zinc-800">
          {video.duration}
        </div>
        <div className="absolute left-0 top-2 bg-[#ff9900] px-2.5 py-1 text-[10px] font-black tracking-wider uppercase text-black shadow-md">
          {video.category}
        </div>

        {/* Center Play Icon Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff9900] text-black shadow-md scale-75 transition-transform duration-300 group-hover:scale-100 hover:bg-[#ff9900]/90">
            <Play className="h-5 w-5 fill-black translate-x-[1px]" />
          </div>
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-4 bg-zinc-950/20">
        <h3 className="line-clamp-2 text-sm font-semibold text-zinc-200 transition-colors duration-200 group-hover:text-[#ff9900]">
          {video.title}
        </h3>
      </div>
    </Link>
  );
}
