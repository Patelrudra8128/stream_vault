import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#0b0f19] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Play className="h-4 w-4 fill-white text-white translate-x-[0.5px]" />
              </div>
              <span className="text-xl font-bold text-white">Stream<span className="text-blue-500">Vault</span></span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Disclaimer: This website only indexes publicly available external content 
              and does not host any videos on its own servers. All content is provided 
              by non-affiliated third parties.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link href="/?category=Trending" className="hover:text-blue-500 transition-colors">Trending</Link></li>
              <li><Link href="/categories" className="hover:text-blue-500 transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">DMCA</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} StreamVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
