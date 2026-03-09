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

export default function Nav() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-[60px] py-7 relative">
      <Link href="/" className="text-[26px] font-bold tracking-tight gradient-text drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
        justack.ai
      </Link>
      <ul className="flex gap-4 md:gap-8 list-none">
        <li>
          <Link href="/help" className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors">
            Help
          </Link>
        </li>
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
          <Link href="/about" className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors">
            About
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
