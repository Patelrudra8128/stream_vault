import { Metadata } from "next";
import Link from "next/link";
import { videos } from "@/data/videos";
import { Folder } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories | StreamVault",
  description: "Browse all video categories on StreamVault.",
};

export default function CategoriesPage() {
  // Extract unique categories and their counts
  const categoriesMap = videos.reduce((acc, video) => {
    acc[video.category] = (acc[video.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoriesMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
          Browse Categories
        </h1>
        <p className="text-lg text-gray-400">
          Explore our vast directory of content sorted by category.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map(([category, count]) => (
          <Link
            key={category}
            href={`/?category=${encodeURIComponent(category)}`}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800 p-8 transition-all duration-200 hover:scale-[1.02] hover:border-blue-500/30 hover:bg-slate-900 shadow-lg"
          >
            <div className="mb-4 rounded-full bg-slate-800/50 p-4 transition-colors group-hover:bg-blue-500/10">
              <Folder className="h-8 w-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <h2 className="text-xl font-bold text-white transition-colors group-hover:text-blue-500">
              {category}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {count} {count === 1 ? "Video" : "Videos"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
