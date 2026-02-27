import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center px-[60px] py-7 relative">
      <Link href="/" className="text-[26px] font-bold tracking-tight gradient-text drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
        justack.ai
      </Link>
      <ul className="flex gap-8 list-none">
        <li>
          <Link href="/a2jai" className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors">
            A2Jai
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors">
            Blog
          </Link>
        </li>
        <li>
          <a href="https://github.com/justack-ai" target="_blank" rel="noopener noreferrer" className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors">
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}
