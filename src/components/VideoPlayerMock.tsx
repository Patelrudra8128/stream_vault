"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Settings, Loader2
} from "lucide-react";
// import Link from "next/link";
import type { Video } from "@/data/videos";

interface VideoPlayerMockProps {
  video: Video;
}

export default function VideoPlayerMock({ video }: VideoPlayerMockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  // const [isLiked, setIsLiked] = useState<boolean | null>(null);
  // const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic deterministic stats matching home page
  // const seed = video.id.charCodeAt(1) || 75;
  // const rawViews = ((seed * 13) % 450) + 50;
  // const views = `${rawViews}K`;
  // const ratingBase = ((seed * 7) % 15) + 85;
  // const [likeCount, setLikeCount] = useState(Math.round(rawViews * ratingBase * 10));
  // const [dislikeCount, setDislikeCount] = useState(Math.round(rawViews * (100 - ratingBase) * 10));

  const gallery = video.gallery && video.gallery.length > 0 ? video.gallery : [video.thumbnail];

  useEffect(() => {
    if (isPlaying) {
      setIsBuffering(true);
      const bufferTimer = setTimeout(() => {
        setIsBuffering(false);
      }, 1000);

      return () => clearTimeout(bufferTimer);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && !isBuffering) {
      // Cycle through screenshots to simulate video frames
      intervalRef.current = setInterval(() => {
        setActiveFrameIndex((prevIndex) => (prevIndex + 1) % gallery.length);
      }, 2000);

      // Increment progress timeline
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, isBuffering, gallery.length]);

  const handlePlayToggle = () => {
    // Monetag Smart Link Popunder integration
    const smartLink = process.env.NEXT_PUBLIC_MONETAG_SMART_LINK;
    if (smartLink && !isPlaying) {
      const hasPopped = sessionStorage.getItem("sv_player_popped");
      if (!hasPopped) {
        try {
          window.open(smartLink, "_blank");
          sessionStorage.setItem("sv_player_popped", "true");
        } catch (e) {
          console.error("Popup blocked or failed to open:", e);
        }
      }
    }
    setIsPlaying(!isPlaying);
  };


  /*
  const handleLike = () => {
    if (isLiked === true) {
      setIsLiked(null);
      setLikeCount(prev => prev - 1);
    } else {
      if (isLiked === false) {
        setDislikeCount(prev => prev - 1);
      }
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleDislike = () => {
    if (isLiked === false) {
      setIsLiked(null);
      setDislikeCount(prev => prev - 1);
    } else {
      if (isLiked === true) {
        setLikeCount(prev => prev - 1);
      }
      setIsLiked(false);
      setDislikeCount(prev => prev + 1);
    }
  };
  */

  const currentDurationInSeconds = Math.round((progress / 100) * 312); // Mock 5:12 (312s)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // const likeRatio = Math.round((likeCount / (likeCount + dislikeCount)) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Mock Player Box */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-2xl group/player">
        {/* Buffering Spinner */}
        {isBuffering && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-[#ff9900]" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Loading High-Speed Stream...</span>
            </div>
          </div>
        )}

        {/* Video Canvas (Frame switcher or Thumbnail) */}
        <div className="h-full w-full select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={isPlaying && !isBuffering ? gallery[activeFrameIndex] : video.thumbnail} 
            alt={video.title} 
            className="h-full w-full object-cover opacity-90 transition-opacity duration-300"
          />
        </div>

        {/* Dark Screen Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

        {/* Big play overlay button */}
        {!isPlaying && !isBuffering && (
          <button 
            onClick={handlePlayToggle}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 group-hover/player:bg-black/45 transition-colors"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff9900] text-black shadow-2xl transition-all duration-300 scale-100 hover:scale-105">
              <Play className="h-7 w-7 fill-black translate-x-[1.5px]" />
            </div>
          </button>
        )}

        {/* Player Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col gap-2 translate-y-1 group-hover/player:translate-y-0 opacity-90 group-hover/player:opacity-100 transition-all duration-300">
          
          {/* Progress Slider */}
          <div className="relative w-full h-1 bg-zinc-700/85 rounded-full cursor-pointer overflow-hidden group/progress">
            <div 
              className="absolute left-0 top-0 h-full bg-[#ff9900] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-zinc-300 select-none">
            {/* Play, Volume, Time */}
            <div className="flex items-center gap-4">
              <button onClick={handlePlayToggle} className="hover:text-white transition-colors">
                {isPlaying ? <Pause className="h-4.5 w-4.5 fill-current text-white" /> : <Play className="h-4.5 w-4.5 fill-current text-white" />}
              </button>
              
              <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors">
                {isMuted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
              </button>

              <span>
                {formatTime(currentDurationInSeconds)} <span className="text-zinc-500">/</span> {video.duration}
              </span>
            </div>

            {/* Quality, Settings, Fullscreen */}
            <div className="flex items-center gap-4 relative">
              <span className="rounded bg-[#ff9900]/10 border border-[#ff9900]/20 px-1 text-[9px] font-black uppercase text-[#ff9900]">
                {selectedQuality}
              </span>
              
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className="hover:text-white transition-colors"
              >
                <Settings className="h-4.5 w-4.5" />
              </button>
              
              <button className="hover:text-white transition-colors">
                <Maximize2 className="h-4.5 w-4.5" />
              </button>

              {/* Quality Settings Panel */}
              {showSettings && (
                <div className="absolute bottom-8 right-8 z-30 bg-zinc-950 border border-zinc-800 rounded-lg p-2 flex flex-col gap-1 w-24 text-[10px]">
                  {["1080p", "720p", "Auto"].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setSelectedQuality(q);
                        setShowSettings(false);
                      }}
                      className={`text-left rounded px-1.5 py-1 transition-colors ${selectedQuality === q ? "bg-[#ff9900] text-black" : "hover:bg-zinc-850"}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info & Stats Section */}
      <div className="border-b border-zinc-900 pb-5">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-4 uppercase">
          {video.title}
        </h1>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Uploader Profile & Stats (Commented Out)
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 font-black text-sm text-[#ff9900]">
              {video.sourceName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-white leading-none">{video.sourceName} Network</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#ff9900] fill-black" />
              </div>
              <span className="text-[11px] text-zinc-500">1.4M Subscribers</span>
            </div>
            
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`ml-3 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                isSubscribed 
                  ? "bg-zinc-900 text-zinc-400 border border-zinc-800" 
                  : "bg-[#ff9900] text-black hover:bg-[#ff9900]/95"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          */}

          {/* Social Stats Action Buttons (Commented Out)
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-lg bg-zinc-950 p-1 border border-zinc-850">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                  isLiked === true ? "bg-zinc-900 text-[#ff9900]" : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{likeCount.toLocaleString("en-US")}</span>
              </button>
              <button 
                onClick={handleDislike}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                  isLiked === false ? "bg-zinc-900 text-red-500" : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{dislikeCount.toLocaleString("en-US")}</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              <button className="flex items-center gap-1 rounded-lg bg-zinc-900 border border-zinc-850 px-3 py-1.5 text-xs font-bold uppercase hover:bg-zinc-850 transition-colors">
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>
              
              <Link 
                href={`/video/${video.slug}/generate`}
                className="flex items-center gap-1 rounded-lg bg-[#ff9900]/10 border border-[#ff9900]/25 text-[#ff9900] px-3.5 py-1.5 text-xs font-bold uppercase hover:bg-[#ff9900]/20 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Stream HD / Get Link</span>
              </Link>
            </div>
          </div>
          */}
        </div>

        {/* View count & visual rating bar (Commented Out)
        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase">
            <span>{views} Views</span>
            <span>{likeRatio}% Like Ratio</span>
          </div>
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden flex">
            <div className="h-full bg-[#ff9900]" style={{ width: `${likeRatio}%` }} />
            <div className="h-full bg-zinc-850" style={{ width: `${100 - likeRatio}%` }} />
          </div>
        </div>
        */}
      </div>

      {/* Description & Tags Card */}
      <div className="rounded-xl bg-zinc-950 p-5 border border-zinc-900 flex flex-col gap-4">
        <div>
          {/*<h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-1.5">Description</h3>*/}
          <p className="text-xs sm:text-sm text-[#ff9900] leading-relaxed font-bold">
            Scroll down to the bottom of this page and click on &quot;Generate Link&quot; to generate your streaming or download link.
          </p>
        </div>
        {/*<div>*/}
        {/*  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Category & Tags</h3>*/}
        {/*  <div className="flex flex-wrap gap-1.5">*/}
        {/*    <Link */}
        {/*      href={`/?category=${video.category}`}*/}
        {/*      className="rounded bg-zinc-900 border border-zinc-850 hover:border-[#ff9900]/30 hover:text-[#ff9900] text-zinc-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors"*/}
        {/*    >*/}
        {/*      Category: {video.category}*/}
        {/*    </Link>*/}
        {/*    {video.tags.map((tag) => (*/}
        {/*      <Link*/}
        {/*        key={tag}*/}
        {/*        href={`/?search=${encodeURIComponent(tag)}`}*/}
        {/*        className="rounded bg-zinc-900 border border-zinc-850 hover:border-[#ff9900]/30 hover:text-[#ff9900] text-zinc-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors"*/}
        {/*      >*/}
        {/*        #{tag}*/}
        {/*      </Link>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
