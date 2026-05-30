import { notFound } from "next/navigation";
import { videos } from "@/data/videos";
import {Clock, ChevronLeft, ExternalLink, Tag} from "lucide-react";
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
    <Link href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-400 hover:text-neon-blue transition-colors">
      <ChevronLeft className="mr-1 h-4 w-4"/> Back to Directory
    </Link>

        {/* Banner */}
        <div
            className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 shadow-2xl shadow-neon-blue/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>

          <div className="absolute bottom-6 left-6 right-6">
            <div
                className="mb-2 inline-block rounded bg-gradient-to-r from-neon-purple to-neon-blue px-3 py-1 text-xs font-bold text-white shadow-lg">
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
              <Clock className="h-5 w-5 text-neon-blue"/>
              <span>{video.duration}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                  {video.sourceName.charAt(0)}
                </span>
              <span>{video.sourceName}</span>
            </div>
          </div>

          <GenerateLinkAction />
        </div>

        {/* Description & Tags */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-white">About this video</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            {video.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Tag className="h-5 w-5 text-neon-pink mr-2"/>
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

        {/* Gallery */}
        {video.gallery && video.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-white border-b border-white/10 pb-2">Gallery</h2>
              <div className="flex flex-col gap-8">
                {video.gallery.map((photo, index) => (
                    <div key={index}
                         className="relative w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 shadow-2xl shadow-neon-blue/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                          src={photo}
                          alt={`${video.title} gallery image ${index + 1}`}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                ))}
              </div>
            </div>
        )}

        <GenerateResult sourceUrl={video.sourceUrl} />
      </div>
)
  ;
}
