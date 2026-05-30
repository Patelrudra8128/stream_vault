"use client";

import Link from "next/link";
import { Search, Menu, X, Play } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b-0 border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue shadow-lg shadow-neon-blue/20 transition-transform group-hover:scale-110">
                <Play className="h-4 w-4 fill-white text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-xl font-bold text-transparent">
                Stream<span className="text-neon-blue">Vault</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white placeholder-gray-400 transition-colors focus:border-neon-blue focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue"
                placeholder="Search videos, tags, categories..."
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/?category=Trending" className="transition-colors hover:text-neon-blue">Trending</Link>
            <Link href="/categories" className="transition-colors hover:text-neon-pink">Categories</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
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
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
          <div className="space-y-4 px-4 pb-6 pt-4">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none"
                placeholder="Search videos..."
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Link href="/?category=Trending" className="text-gray-300 hover:text-white">Trending</Link>
              <Link href="/categories" className="text-gray-300 hover:text-white">Categories</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
