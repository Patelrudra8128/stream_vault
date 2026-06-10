import { notFound } from "next/navigation";
import { videos } from "@/data/videos";
import { ChevronLeft, ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import VideoPlayerMock from "@/components/VideoPlayerMock";

export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#ff9900] transition-colors"
      >
        <ChevronLeft className="mr-1 h-4.5 w-4.5" /> Back to Directory
      </Link>

      {/* Interactive Mock Player Container */}
      <VideoPlayerMock video={video} />

      {/* Gallery / Scenes Previews */}
      {video.gallery && video.gallery.length > 0 && (
        <div className="mt-14">
          <div className="mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-[#ff9900]" />
            <h2 className="text-lg font-black uppercase tracking-wider text-white">Scene Previews (Screenshots)</h2>
          </div>
          <div className="flex flex-col gap-6">
            {video.gallery.map((photo, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-xl bg-black border border-zinc-900 shadow-xl hover:border-[#ff9900]/25 transition-colors duration-300 group/gallery"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`${video.title} gallery image ${index + 1}`}
                  className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-700 opacity-90 group-hover/gallery:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Button Section */}
      <div className="mt-12 flex flex-col items-center gap-3 border-t border-zinc-900 pt-10">
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Ready to stream or download this video?</p>
        <Link
          href={`/video/${video.slug}/generate`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9900] px-16 py-4 text-base font-black uppercase tracking-wider text-black transition-all hover:bg-[#ff9900]/90 active:scale-95 shadow-lg shadow-[#ff9900]/10"
        >
          Next: Generate Link <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
