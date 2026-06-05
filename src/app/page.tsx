"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { videos } from "@/data/videos";
import VideoCard from "@/components/VideoCard";
import { SlidersHorizontal, Eye, Flame, Award } from "lucide-react";

const CATEGORIES = ["All", "Trending", "VR", "Cosplay", "Featured", "Amateur"];

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");

  useEffect(() => {
    if (categoryParam) {
      const matchedCategory = CATEGORIES.find(
        (cat) => cat.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matchedCategory) {
        setActiveCategory(matchedCategory);
        return;
      }
    }
    setActiveCategory("All");
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const searchPart = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
    if (cat === "All") {
      router.push(searchQuery ? `/?search=${encodeURIComponent(searchQuery)}` : "/");
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}${searchPart}`);
    }
  };

  // Helper functions matching card mock values for sorting
  const getViewsValue = (id: string) => {
    const seed = id.charCodeAt(1) || 75;
    return ((seed * 13) % 450) + 50;
  };

  const getRatingValue = (id: string) => {
    const seed = id.charCodeAt(1) || 75;
    return ((seed * 7) % 15) + 85;
  };

  const filteredVideos = videos
    .filter((video) => {
      const matchesCategory =
        activeCategory === "All" ||
        video.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "views") {
        return getViewsValue(b.id) - getViewsValue(a.id);
      }
      if (sortBy === "rating") {
        return getRatingValue(b.id) - getRatingValue(a.id);
      }
      // default: trending / order in array
      return 0;
    });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Premium Hero Section */}
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-8 text-center sm:p-12 border border-zinc-800/80 relative overflow-hidden shadow-2xl gold-glow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-[#ff9900]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-400 border border-zinc-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Secure Video Index & Directory</span>
          </div>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
            THE PREMIUM <span className="text-[#ff9900]">VAULT</span>
          </h1>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Discover the highest-rated adult streams on the web. Fast link generation, no sign-ups required, and updated daily. Select a category below to filter.
          </p>
        </div>
      </div>

      {/* Categories & Filter Bar */}
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? "bg-[#ff9900] text-black border-transparent shadow-md shadow-[#ff9900]/10"
                    : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:bg-zinc-800/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Selectors */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
          <span className="text-xs font-bold text-zinc-500 uppercase">Sort:</span>
          <div className="flex rounded-lg bg-zinc-950 p-1 border border-zinc-850">
            <button
              onClick={() => setSortBy("trending")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-extrabold uppercase transition-colors ${
                sortBy === "trending" ? "bg-zinc-900 text-[#ff9900]" : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              <Flame className="h-3 w-3" />
              Trending
            </button>
            <button
              onClick={() => setSortBy("views")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-extrabold uppercase transition-colors ${
                sortBy === "views" ? "bg-zinc-900 text-[#ff9900]" : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              <Eye className="h-3 w-3" />
              Views
            </button>
            <button
              onClick={() => setSortBy("rating")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-extrabold uppercase transition-colors ${
                sortBy === "rating" ? "bg-zinc-900 text-[#ff9900]" : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              <Award className="h-3 w-3" />
              Rating
            </button>
          </div>
        </div>
      </div>

      {/* Search query status banner */}
      {searchQuery && (
        <div className="mb-8 flex items-center justify-between rounded-xl bg-zinc-900/40 border border-zinc-800 px-5 py-3">
          <span className="text-sm text-zinc-300">
            Showing results for <span className="font-bold text-white">&ldquo;{searchQuery}&rdquo;</span>
          </span>
          <button
            onClick={() => {
              if (activeCategory === "All") {
                router.push("/");
              } else {
                router.push(`/?category=${encodeURIComponent(activeCategory)}`);
              }
            }}
            className="text-xs font-bold text-[#ff9900] hover:text-[#ff9900]/80 transition-colors uppercase tracking-wider"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-zinc-500 text-sm">No videos found for this search or category filter.</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff9900] border-t-transparent"></div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
