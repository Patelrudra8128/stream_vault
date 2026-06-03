import { notFound } from "next/navigation";
import { videos } from "@/data/videos";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { GenerateLinkAction } from "./GenerateLinkAction";
import { GenerateResult } from "./GenerateResult";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const video = videos.find((v) => v.slug === params.slug);
  if (!video) return { title: "Video Not Found" };

  return {
    title: `Generate Link - ${video.title} | StreamVault`,
    description: video.description,
  };
}

export default function GenerateLinkPage({ params }: { params: { slug: string } }) {
  const video = videos.find((v) => v.slug === params.slug);

  if (!video) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-semibold text-slate-400 hover:text-blue-500 transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Directory
      </Link>

      {/* Banner */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover opacity-90" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-2.5 inline-block rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-md">
            {video.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-balance drop-shadow-md tracking-tight">
            {video.title}
          </h1>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-center gap-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
        <GenerateLinkAction />
      </div>

      {/* Gallery */}
      {video.gallery && video.gallery.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-white border-b border-slate-800 pb-2">Gallery</h2>
          <div className="flex flex-col gap-8">
            {video.gallery.map((photo, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl hover:border-blue-500/25 transition-colors duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`${video.title} gallery image ${index + 1}`}
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <GenerateResult sourceUrl={video.sourceUrl} />
    </div>
  );
}
