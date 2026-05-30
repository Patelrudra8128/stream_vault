import { notFound } from "next/navigation";
import { videos } from "@/data/videos";
import { ExternalLink, Clock, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const video = videos.find((v) => v.slug === params.slug);
  if (!video) return { title: "Video Not Found" };

  return {
    title: `${video.title} | StreamVault`,
    description: video.description,
  };
}

export default function VideoPage({ params }: { params: { slug: string } }) {
  const video = videos.find((v) => v.slug === params.slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = videos.filter((v) => v.category === video.category && v.id !== video.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-gray-400 hover:text-neon-blue transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Directory
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Banner */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 shadow-2xl shadow-neon-blue/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-2 inline-block rounded bg-gradient-to-r from-neon-purple to-neon-blue px-3 py-1 text-xs font-bold text-white shadow-lg">
                {video.category}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-balance drop-shadow-md">
                {video.title}
              </h1>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass p-6">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-neon-blue" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                  {video.sourceName.charAt(0)}
                </span>
                <span>{video.sourceName}</span>
              </div>
            </div>

            <a
              href={video.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-neon-purple/25"
            >
              Watch on Source Site <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Description & Tags */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">About this video</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {video.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Tag className="h-5 w-5 text-neon-pink mr-2" />
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-gray-300 hover:border-neon-pink/50 hover:text-white transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="mb-6 text-lg font-bold text-white border-b border-white/10 pb-2">Related Content</h3>
          <div className="flex flex-col gap-4">
            {relatedVideos.length > 0 ? (
              relatedVideos.map((rv) => (
                <Link key={rv.id} href={`/video/${rv.slug}`} className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-white/5 border border-transparent hover:border-white/10">
                  <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-lg bg-gray-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rv.thumbnail} alt={rv.title} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {rv.duration}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="line-clamp-2 text-sm font-medium text-white group-hover:text-neon-blue transition-colors">
                      {rv.title}
                    </h4>
                    <span className="mt-1 text-xs text-gray-500">{rv.sourceName}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">No related videos found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
