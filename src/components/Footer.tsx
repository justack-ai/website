import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-[60px] py-[60px] pb-10 flex justify-between items-center border-t border-white/5">
      <div>
        <div className="text-lg font-semibold text-white/25 tracking-tight">justack.ai</div>
        <div className="mt-1.5 text-xs font-light text-white/20 tracking-wide">
          &copy; 2026 justack.ai &mdash; A2Jai &middot; Open Source Legal Help Tools
        </div>
      </div>
      <div className="flex gap-6">
        <a href="https://twitter.com/justackai" target="_blank" rel="noopener noreferrer" className="text-white/20 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors">
          Twitter
        </a>
        <a href="https://github.com/justack-ai" target="_blank" rel="noopener noreferrer" className="text-white/20 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors">
          GitHub
        </a>
        <Link href="/blog" className="text-white/20 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors">
          Blog
        </Link>
      </div>
    </footer>
  );
}
