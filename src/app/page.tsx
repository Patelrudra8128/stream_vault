"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { videos } from "@/data/videos";
import VideoCard from "@/components/VideoCard";

const CATEGORIES = ["All", "Trending", "VR", "Cosplay", "Featured", "Amateur"];

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  const [activeCategory, setActiveCategory] = useState("All");

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

  // const handleCategoryChange = (cat: string) => {
  //   setActiveCategory(cat);
  //   const searchPart = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
  //   if (cat === "All") {
  //     router.push(searchQuery ? `/?search=${encodeURIComponent(searchQuery)}` : "/");
  //   } else {
  //     router.push(`/?category=${encodeURIComponent(cat)}${searchPart}`);
  //   }
  // };

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      activeCategory === "All" ||
      video.category.toLowerCase() === activeCategory.toLowerCase();
    
    const matchesSearch =
      !searchQuery ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 rounded-3xl bg-slate-900/60 p-8 text-center sm:p-16 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] opacity-[0.04] mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to Stream<span className="text-blue-500">Vault</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl">
            The premium directory for discovering the best video content on the web. Explore our curated selection of high-quality streams.
          </p>
        </div>
      </div>

      {/* Categories */}
      {/*<div className="mb-8 flex flex-wrap gap-3 justify-center sm:justify-start">*/}
      {/*  {CATEGORIES.map((cat) => (*/}
      {/*    <button*/}
      {/*      key={cat}*/}
      {/*      onClick={() => handleCategoryChange(cat)}*/}
      {/*      className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 border ${*/}
      {/*        activeCategory === cat*/}
      {/*          ? "bg-blue-600 text-white border-transparent shadow-md shadow-blue-500/10 scale-105"*/}
      {/*          : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border-slate-800"*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      {cat}*/}
      {/*    </button>*/}
      {/*  ))}*/}
      {/*</div>*/}

      {/* Search query status banner */}
      {searchQuery && (
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-slate-900/40 border border-slate-800 px-6 py-4">
          <span className="text-slate-300">
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
            className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500 text-lg">No videos found for this category.</p>
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
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
