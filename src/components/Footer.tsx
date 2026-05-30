import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#050505] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue">
                <Play className="h-4 w-4 fill-white text-white" />
              </div>
              <span className="text-xl font-bold text-white">StreamVault</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Disclaimer: This website only indexes publicly available external content 
              and does not host any videos on its own servers. All content is provided 
              by non-affiliated third parties.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-neon-blue">Home</Link></li>
              <li><Link href="/?category=Trending" className="hover:text-neon-blue">Trending</Link></li>
              <li><Link href="/categories" className="hover:text-neon-blue">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/terms" className="hover:text-neon-pink">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-neon-pink">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-neon-pink">DMCA</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} StreamVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
