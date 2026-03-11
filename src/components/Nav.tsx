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

"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/help", label: "Help" },
  { href: "/a2jai", label: "A2Jai" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-[60px] py-7 relative">
      <Link
        href="/"
        className="text-[26px] font-bold tracking-tight gradient-text drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]"
      >
        justack.ai
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://github.com/justack-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 no-underline text-sm font-light tracking-[1px] uppercase hover:text-white transition-colors"
          >
            GitHub
          </a>
        </li>
      </ul>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 bg-transparent border-none cursor-pointer"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span
          className={`block w-6 h-0.5 bg-white/60 transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white/60 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white/60 transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 md:hidden">
          <div
            className="mx-4 mt-2 rounded-2xl py-6 px-6 flex flex-col gap-1"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,13,13,0.97) 0%, rgba(30,20,60,0.97) 100%)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 text-white/70 no-underline text-base font-light tracking-[1px] uppercase hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/justack-ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block py-3 px-2 text-white/70 no-underline text-base font-light tracking-[1px] uppercase hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
