"use client";

import { useState } from "react";
import { videos } from "@/data/videos";
import VideoCard from "@/components/VideoCard";

const CATEGORIES = ["All", "Trending", "VR", "Cosplay", "Featured", "Amateur"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = videos.filter((video) => {
    if (activeCategory === "All") return true;
    return video.category === activeCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 rounded-3xl bg-gradient-to-br from-neon-purple/20 via-black to-neon-blue/20 p-8 text-center sm:p-16 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">StreamVault</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            The premium directory for discovering the best video content on the web. Explore our curated selection of high-quality streams.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400">No videos found for this category.</p>
        </div>
      )}
    </div>
  );
}
