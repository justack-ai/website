/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-[60px] py-[60px] pb-10 border-t border-white/5">
      <div className="max-w-[900px] mb-10 text-xs font-light text-white/35 leading-relaxed tracking-wide">
        justack.ai is not your lawyer or your legal agent. Our products provide help and are no substitute for a lawyer.
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="text-lg font-semibold text-white/25 tracking-tight">justack.ai</div>
          <div className="mt-1.5 text-xs font-light text-white/20 tracking-wide">
            &copy; 2026 Humilitas Group Limited &mdash; A2Jai &middot; Open Source Legal Help Tools
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Link href="/about" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            About
          </Link>
          <Link href="/blog" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            Blog
          </Link>
          <Link href="/faq" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            FAQ
          </Link>
          <Link href="/privacy" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            Privacy
          </Link>
          <Link href="/terms" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            Terms
          </Link>
          <a href="https://twitter.com/justackai" target="_blank" rel="noopener noreferrer" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            Twitter
          </a>
          <a href="https://github.com/justack-ai" target="_blank" rel="noopener noreferrer" className="text-white/25 no-underline text-xs font-light tracking-[1px] uppercase hover:text-white/50 transition-colors py-2.5 px-2 min-h-[44px] flex items-center">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
