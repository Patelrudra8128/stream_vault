import { notFound } from "next/navigation";
import { videos } from "@/data/videos";
import { ChevronLeft } from "lucide-react";
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-gray-400 hover:text-neon-blue transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Directory
      </Link>

          {/* Gallery */}
          {video.gallery && video.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-white border-b border-white/10 pb-2">Gallery</h2>
              <div className="flex flex-col gap-8">
                {video.gallery.map((photo, index) => (
                  <div key={index} className="relative w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 shadow-2xl shadow-neon-blue/5">
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

          {/* Next Button */}
          <div className="mt-12 flex justify-center">
            <Link
              href={`/video/${video.slug}/generate`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 shadow-xl shadow-neon-blue/25"
            >
              Next
            </Link>
          </div>
        </div>
  );
}
