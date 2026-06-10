import { notFound } from "next/navigation";
import { videos, isVideoUrl } from "@/data/videos";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { GenerateLinkAction } from "./GenerateLinkAction";
import { GenerateResult } from "./GenerateResult";

export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

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

  // Calculate authentic deterministic file data
  // const seed = video.id.charCodeAt(1) || 75;
  // const fileSize = `${((seed * 1.8) % 250 + 90).toFixed(1)} MB`;

  // let resolution = "1080p Full HD";
  // if (video.category === "VR") {
  //   resolution = "8K VR 3D";
  // } else if (video.category === "Trending") {
  //   resolution = "4K Ultra HD";
  // }

  // const fileHash = `ea842d0a${seed}f882be1e7da92b2ff82c5`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/video/${video.slug}`}
        className="mb-6 inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#ff9900] transition-colors"
      >
        <ChevronLeft className="mr-1 h-4.5 w-4.5" /> Back to Video Page
      </Link>

      {/* Banner */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
        {isVideoUrl(video.thumbnail) ? (
          <video
            src={video.thumbnail}
            className="h-full w-full object-cover opacity-90"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover opacity-90" />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <div className="mb-2 inline-block rounded bg-[#ff9900] px-2 py-0.5 text-[9px] font-black uppercase text-black tracking-wider">
              {video.category} Secure Link
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight line-clamp-1">
              {video.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Grid: File Info & Mirror Selection (Commented Out)
      <div className="grid gap-6 md:grid-cols-5 mb-8">

        <div className="md:col-span-3 rounded-xl bg-zinc-950 p-5 border border-zinc-900 flex flex-col gap-4">
          <div className="border-b border-zinc-900 pb-3 flex items-center gap-2 text-zinc-400">
            <FileVideo className="h-4.5 w-4.5 text-[#ff9900]" />
            <h3 className="text-xs font-black uppercase tracking-wider">File Metadata</h3>
          </div>

          <div className="grid grid-cols-3 gap-y-3 text-xs">
            <div className="text-zinc-500 font-bold uppercase">File Name:</div>
            <div className="col-span-2 text-zinc-300 font-semibold truncate select-all">{video.slug}_streamvault.mp4</div>

            <div className="text-zinc-500 font-bold uppercase">File Size:</div>
            <div className="col-span-2 text-[#ff9900] font-black">{fileSize}</div>

            <div className="text-zinc-500 font-bold uppercase">Resolution:</div>
            <div className="col-span-2 text-zinc-300 font-bold">{resolution}</div>

            <div className="text-zinc-500 font-bold uppercase">SHA-256:</div>
            <div className="col-span-2 text-[10px] text-zinc-500 font-mono truncate select-all">{fileHash}</div>

            <div className="text-zinc-500 font-bold uppercase">Status:</div>
            <div className="col-span-2 text-emerald-500 font-bold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Checked & Safe
            </div>
          </div>
        </div>

        <div className="md:col-span-2 rounded-xl bg-zinc-950 p-5 border border-zinc-900 flex flex-col gap-4">
          <div className="border-b border-zinc-900 pb-3 flex items-center gap-2 text-zinc-400">
            <Server className="h-4.5 w-4.5 text-[#ff9900]" />
            <h3 className="text-xs font-black uppercase tracking-wider">Select Server Mirror</h3>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg bg-zinc-900/50 p-2.5 border border-[#ff9900]/30 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-white leading-none">Vault Premium (Gold)</div>
                <span className="text-[10px] text-zinc-500">Speed: Unlimited (10Gbps)</span>
              </div>
              <span className="rounded bg-[#ff9900]/10 border border-[#ff9900]/25 px-1.5 py-0.5 text-[8px] font-bold uppercase text-[#ff9900]">Selected</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-zinc-950 p-2.5 border border-zinc-900 opacity-55 hover:opacity-75 transition-opacity cursor-not-allowed">
              <div>
                <div className="text-xs font-bold text-zinc-400 leading-none">Standard Mirror (Free)</div>
                <span className="text-[10px] text-zinc-600">Speed: Limited (1.5Mbps)</span>
              </div>
              <span className="text-[8px] font-bold text-zinc-650 uppercase">Restricted</span>
            </div>
          </div>
        </div>

      </div>
      */}

      {/* Generator Console Action Box */}
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-950 border border-zinc-900 p-6">
        <div className="flex items-center justify-center">
          <GenerateLinkAction />
        </div>
      </div>

      {/* Previews Checkpoint Scenes */}
      {video.gallery && video.gallery.length > 0 && (
        <div className="mt-14">
          <div className="mb-6 border-b border-zinc-900 pb-3 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-[#ff9900]" />
            <h2 className="text-lg font-black uppercase tracking-wider text-white">Visual File Checkpoints</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {video.gallery.map((photo, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-black border border-zinc-900 aspect-video shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`${video.title} verification scene ${index + 1}`}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-[8px] font-bold text-zinc-400 uppercase tracking-wider border border-zinc-800">
                  Frame #{index + 1} Checked
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Display Link */}
      <GenerateResult sourceUrl={video.sourceUrl} />
    </div>
  );
}
