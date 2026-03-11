/*
 * Copyright 2026 Humilitas Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-[60px] py-[60px] pb-10 border-t border-white/5">
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
