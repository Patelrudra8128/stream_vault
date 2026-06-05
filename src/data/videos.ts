export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  gallery?: string[];
}

export function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)($|\?)/i.test(url);
}

export const videos: Video[] = [
  {
    id: "v1",
    slug: "v1",
    title: "Step-siblings having fun",
    description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
    thumbnail: "/photo_2026-06-02_21-43-20.jpg",
    duration: "05:12",
    category: "Trending",
    tags: ["cyberpunk", "gaming", "neon", "trailer"],
    sourceName: "YouTube",
    sourceUrl: "https://flezen.com/s/d8f6uc1bjlnukbcmurk0-bg2uncnyc0",
    gallery: [
      "/1/1.jfif",
      "/1/2.jfif",
      "/1/3.jfif",
      "/1/4.jfif",
    ]
  },
  // {
  //   id: "v2",
  //   slug: "v2",
  //   title: "Sexy Girl getting pumped hard in doggy style by jija ji",
  //   description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
  //   thumbnail: "/2/thumbnail.jpg",
  //   duration: "02:45",
  //   category: "Trending",
  //   tags: ["cyberpunk", "gaming", "neon", "trailer"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://flezen.com/s/d8f6u01bjlnukbcmuncgbtdveinwd4o",
  //   gallery: [
  //     "/2/1.jpg",
  //     "/2/2.jpg",
  //     "/2/3.jpg",
  //     "/2/4.jpg",
  //   ]
  // },
  // {
  //   id: "v3",
  //   slug: "v3",
  //   title: "Step sister having fun with step brother",
  //   description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
  //   thumbnail: "/3/1.jpg",
  //   duration: "01:36",
  //   category: "Trending",
  //   tags: ["cyberpunk", "gaming", "neon", "trailer"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://flezen.com/s/d8ck6nhbjlnprs5ioitg6pag6bhwhfu",
  //   gallery: [
  //     "/3/1.jpg",
  //     "/3/2.jpg",
  //     "/3/3.jpg",
  //     "/3/4.jpg",
  //   ]
  // },
  // {
  //   id: "v4",
  //   slug: "v4",
  //   title: "Finally Devar ne apni bhabhi ko dene k liye mana hi liya",
  //   description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
  //   thumbnail: "/4/video_2026-06-04_17-32-37.mp4",
  //   duration: "01:06",
  //   category: "Trending",
  //   tags: ["cyberpunk", "gaming", "neon", "trailer"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://flezen.com/s/d8dga79bjlnnn06pv4jgeufkulu1lfi",
  //   gallery: [
  //     "/4/1.jpg",
  //     "/4/2.jpg",
  //     "/4/3.jpg",
  //     "/4/4.jpg",
  //     "/4/5.jpg",
  //   ]
  // },
  // {
  //   id: "v5",
  //   slug: "v5",
  //   title: "Don't Judge A Book By Its Cover, She Proves Why",
  //   description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
  //   thumbnail: "/5/1.jpg",
  //   duration: "01:06",
  //   category: "Trending",
  //   tags: ["cyberpunk", "gaming", "neon", "trailer"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://flezen.com/s/d8f6pq1bjlnukbcmtbd0u6u9fss01mu",
  //   gallery: [
  //     "/5/1.jpg",
  //     "/5/2.jpg",
  //     "/5/3.jpg",
  //     "/5/4.jpg",
  //     "/5/5.jpg",
  //   ]
  // },
  {
    id: "v6",
    slug: "v6",
    title: "Tissue lelo yaar",
    description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
    thumbnail: "/6/video_2026-06-04_21-31-19.mp4",
    duration: "00:52",
    category: "Trending",
    tags: ["cyberpunk", "gaming", "neon", "trailer"],
    sourceName: "YouTube",
    sourceUrl: "https://flezen.com/s/d8f6o89bjlnukbcmsr40dux-ftgyqz0",
    gallery: [
      "/6/1.jpg",
      "/6/2.jpg",
      "/6/3.jpg",
      "/6/4.jpg",
    ]
  },
  // {
  //   id: "v7",
  //   slug: "v7",
  //   title: "Fun with friend after breakup",
  //   description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
  //   thumbnail: "/7/video_2026-06-04_22-10-55.mp4",
  //   duration: "12:49",
  //   category: "Trending",
  //   tags: ["cyberpunk", "gaming", "neon", "trailer"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://flezen.com/s/d8f6ns9bjlnukbcmsnh0s6up6xjxeqw",
  //   gallery: [
  //     "/7/1.jpg",
  //     "/7/2.jpg",
  //     "/7/3.jpg",
  //     "/7/4.jpg",
  //     "7/5.jpg",
  //     "/7/6.jpg",
  //     "/7/7.jpg",
  //   ]
  // },
  // {
  //   id: "v2",
  //   slug: "vr-chat-funny-moments",
  //   title: "VR Chat: The Funniest Moments of 2024",
  //   description: "A compilation of the most hilarious and absurd encounters in VR Chat this year. Unpredictable avatars and crazy scenarios.",
  //   thumbnail: "photo_2026-06-02_21-46-29.jpg",
  //   duration: "12:45",
  //   category: "VR",
  //   tags: ["vr", "comedy", "community"],
  //   sourceName: "Twitch",
  //   sourceUrl: "https://flezen.com/s/d8f6u01bjlnukbcmuncgbtdveinwd4o",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
  //   ]
  // },
  // {
  //   id: "v3",
  //   slug: "epic-cosplay-showcase-comic-con",
  //   title: "Epic Cosplay Showcase at Comic-Con",
  //   description: "Witness the incredible craftsmanship and dedication of cosplayers showcasing their amazing outfits from anime, gaming, and movies.",
  //   thumbnail: "photo_2026-06-02_21-47-17.jpg",
  //   duration: "08:30",
  //   category: "Cosplay",
  //   tags: ["cosplay", "comic-con", "art"],
  //   sourceName: "Vimeo",
  //   sourceUrl: "https://flezen.com/s/d8duv5hbjlnnn06vc5a0x5yee9qcpjo",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1612036782180-6f0b6ce846ce?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop"
  //   ]
  // },
  // {
  //   id: "v4",
  //   slug: "indie-game-devlog-1",
  //   title: "Indie Game Devlog #1: Making the Player Controller",
  //   description: "Follow along as I start building my new indie game from scratch. In this first episode, we focus on responsive player movement.",
  //   thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  //   duration: "15:20",
  //   category: "Amateur",
  //   tags: ["devlog", "coding", "indiedev"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://youtube.com",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
  //   ]
  // },
  // {
  //   id: "v5",
  //   slug: "cinematic-drone-footage-tokyo",
  //   title: "Nighttime Tokyo in 4K: Cinematic Drone Footage",
  //   description: "Breathtaking 4K drone footage capturing the stunning neon lights and busy streets of Tokyo at night.",
  //   thumbnail: "https://images.unsplash.com/photo-1542051812871-f923b7a54a01?q=80&w=1200&auto=format&fit=crop",
  //   duration: "04:55",
  //   category: "Featured",
  //   tags: ["drone", "tokyo", "cinematic", "neon"],
  //   sourceName: "YouTube",
  //   sourceUrl: "https://youtube.com",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1542051812871-f923b7a54a01?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1532522714534-53626c0ae561?q=80&w=1200&auto=format&fit=crop"
  //   ]
  // },
  // {
  //   id: "v6",
  //   slug: "synthwave-mix-2024",
  //   title: "Best of Synthwave & Retrowave Mix 2024",
  //   description: "A continuous mix of the best synthwave and retrowave tracks. Perfect for coding, driving, or just chilling.",
  //   thumbnail: "https://images.unsplash.com/photo-1614729939124-03290b55c9ce?q=80&w=1200&auto=format&fit=crop",
  //   duration: "1:05:00",
  //   category: "Trending",
  //   tags: ["music", "synthwave", "retrowave", "mix"],
  //   sourceName: "SoundCloud",
  //   sourceUrl: "https://soundcloud.com",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1614729939124-03290b55c9ce?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  //     "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop"
  //   ]
  // }
];
