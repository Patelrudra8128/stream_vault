"use client";

import Link from "next/link";
import { Search, Menu, X, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    setSearchVal(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#08080a]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff9900] shadow-md shadow-[#ff9900]/15 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#ff9900]/90">
                <Play className="h-4 w-4 fill-black text-black translate-x-[0.5px]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">
                Stream<span className="bg-[#ff9900] text-black px-1.5 py-0.5 rounded text-sm font-black uppercase">Vault</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-[#ff9900] transition-colors" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full rounded-full border border-zinc-800 bg-zinc-900/40 py-2 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:border-[#ff9900] focus:bg-zinc-900/70 focus:outline-none focus:ring-2 focus:ring-[#ff9900]/20"
                placeholder="Search videos, tags, categories..."
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-300">
            <Link href="/?category=Trending" className="transition-colors hover:text-[#ff9900]">Trending</Link>
            <Link href="/categories" className="transition-colors hover:text-[#ff9900]">Categories</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-850 bg-[#08080a]/95 backdrop-blur-2xl">
          <div className="space-y-4 px-4 pb-6 pt-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/40 py-2.5 pl-11 pr-3 text-sm text-white placeholder-zinc-500 focus:border-[#ff9900] focus:outline-none focus:ring-2 focus:ring-[#ff9900]/20"
                placeholder="Search videos..."
              />
            </form>
            <div className="flex flex-col space-y-3 pl-1">
              <Link
                href="/?category=Trending"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-350 hover:text-[#ff9900] text-sm font-semibold transition-colors"
              >
                Trending
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-350 hover:text-[#ff9900] text-sm font-semibold transition-colors"
              >
                Categories
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
