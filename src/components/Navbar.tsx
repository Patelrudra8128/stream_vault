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
    <nav className="sticky top-0 z-40 w-full glass border-b border-slate-800/80 bg-[#0b0f19]/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-500/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500">
                <Play className="h-4 w-4 fill-white text-white translate-x-[1px]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Stream<span className="text-blue-500">Vault</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full rounded-full border border-slate-800 bg-slate-900/50 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                placeholder="Search videos, tags, categories..."
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <Link href="/?category=Trending" className="transition-colors hover:text-blue-500">Trending</Link>
            <Link href="/categories" className="transition-colors hover:text-blue-500">Categories</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"
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
        <div className="md:hidden border-t border-slate-800/80 bg-[#0b0f19]/95 backdrop-blur-2xl">
          <div className="space-y-4 px-4 pb-6 pt-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full rounded-xl border border-slate-800 bg-slate-900/50 py-2.5 pl-11 pr-3 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                placeholder="Search videos..."
              />
            </form>
            <div className="flex flex-col space-y-3 pl-1">
              <Link
                href="/?category=Trending"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-blue-500 text-sm font-semibold transition-colors"
              >
                Trending
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-blue-500 text-sm font-semibold transition-colors"
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
