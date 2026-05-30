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
}

export const videos: Video[] = [
  {
    id: "v1",
    slug: "cyberpunk-2077-gameplay-trailer",
    title: "Cyberpunk 2077 - Official Gameplay Trailer",
    description: "Experience the vibrant, dangerous world of Night City in this official gameplay trailer for Cyberpunk 2077. Dive deep into the neon-lit streets.",
    thumbnail: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop",
    duration: "05:12",
    category: "Trending",
    tags: ["cyberpunk", "gaming", "neon", "trailer"],
    sourceName: "YouTube",
    sourceUrl: "https://youtube.com/watch?v=8X2kIfS6fb8"
  },
  {
    id: "v2",
    slug: "vr-chat-funny-moments",
    title: "VR Chat: The Funniest Moments of 2024",
    description: "A compilation of the most hilarious and absurd encounters in VR Chat this year. Unpredictable avatars and crazy scenarios.",
    thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
    duration: "12:45",
    category: "VR",
    tags: ["vr", "comedy", "community"],
    sourceName: "Twitch",
    sourceUrl: "https://twitch.tv"
  },
  {
    id: "v3",
    slug: "epic-cosplay-showcase-comic-con",
    title: "Epic Cosplay Showcase at Comic-Con",
    description: "Witness the incredible craftsmanship and dedication of cosplayers showcasing their amazing outfits from anime, gaming, and movies.",
    thumbnail: "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=1200&auto=format&fit=crop",
    duration: "08:30",
    category: "Cosplay",
    tags: ["cosplay", "comic-con", "art"],
    sourceName: "Vimeo",
    sourceUrl: "https://vimeo.com"
  },
  {
    id: "v4",
    slug: "indie-game-devlog-1",
    title: "Indie Game Devlog #1: Making the Player Controller",
    description: "Follow along as I start building my new indie game from scratch. In this first episode, we focus on responsive player movement.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    duration: "15:20",
    category: "Amateur",
    tags: ["devlog", "coding", "indiedev"],
    sourceName: "YouTube",
    sourceUrl: "https://youtube.com"
  },
  {
    id: "v5",
    slug: "cinematic-drone-footage-tokyo",
    title: "Nighttime Tokyo in 4K: Cinematic Drone Footage",
    description: "Breathtaking 4K drone footage capturing the stunning neon lights and busy streets of Tokyo at night.",
    thumbnail: "https://images.unsplash.com/photo-1542051812871-f923b7a54a01?q=80&w=1200&auto=format&fit=crop",
    duration: "04:55",
    category: "Featured",
    tags: ["drone", "tokyo", "cinematic", "neon"],
    sourceName: "YouTube",
    sourceUrl: "https://youtube.com"
  },
  {
    id: "v6",
    slug: "synthwave-mix-2024",
    title: "Best of Synthwave & Retrowave Mix 2024",
    description: "A continuous mix of the best synthwave and retrowave tracks. Perfect for coding, driving, or just chilling.",
    thumbnail: "https://images.unsplash.com/photo-1614729939124-03290b55c9ce?q=80&w=1200&auto=format&fit=crop",
    duration: "1:05:00",
    category: "Trending",
    tags: ["music", "synthwave", "retrowave", "mix"],
    sourceName: "SoundCloud",
    sourceUrl: "https://soundcloud.com"
  }
];
