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
import WireframeCourthouse from "@/components/WireframeCourthouse";
import EmailCapture from "@/components/EmailCapture";

const routeCards = [
  { title: "I Need Legal Help", path: "/help", color: "#ef4444", rotate: "rotateY(-4deg) rotateX(2deg)", translateY: "0px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="12" r="6"/><path d="M6 30c0-6.627 5.373-12 12-12s12 5.373 12 12"/><path d="M18 22v4M15 26h6"/>
    </svg>
  )},
  { title: "I Want to Build", path: "/build", color: "#a855f7", rotate: "rotateY(3deg) rotateX(-1deg)", translateY: "-20px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="10,12 6,18 10,24"/><polyline points="26,12 30,18 26,24"/><line x1="20" y1="8" x2="16" y2="28"/>
    </svg>
  )},
  { title: "I\u2019m a Lawyer", path: "/tools", color: "#3b82f6", rotate: "rotateY(-3deg) rotateX(1deg)", translateY: "12px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="4" x2="18" y2="14"/><line x1="10" y1="14" x2="26" y2="14"/><line x1="10" y1="14" x2="7" y2="22"/><line x1="26" y1="14" x2="29" y2="22"/>
      <path d="M4 22 Q7 28 10 22"/><path d="M26 22 Q29 28 32 22"/><rect x="14" y="24" width="8" height="2" rx="1"/><line x1="18" y1="14" x2="18" y2="24"/>
    </svg>
  )},
  { title: "I Want to Invest", path: "/invest", color: "#eab308", rotate: "rotateY(4deg) rotateX(-2deg)", translateY: "-12px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,28 6,8"/><polyline points="6,24 14,16 20,20 30,10"/><polyline points="24,10 30,10 30,16"/>
    </svg>
  )},
  { title: "Read the Blog", path: "/blog", color: "rgba(255,255,255,0.7)", rotate: "rotateY(-3deg) rotateX(1.5deg)", translateY: "8px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h24v24H6z"/><line x1="11" y1="13" x2="25" y2="13"/><line x1="11" y1="18" x2="25" y2="18"/><line x1="11" y1="23" x2="20" y2="23"/>
    </svg>
  )},
];

const timelineNodes = [
  { phase: "Phase 1", title: "Foundation", desc: "Landing + A2Jai + Blog", active: true },
  { phase: "Phase 2", title: "Community", desc: "GitHub repos + /build" },
  { phase: "Phase 3", title: "Tools Beta", desc: "/help housing + /tools demo" },
  { phase: "Phase 4", title: "Public Launch", desc: "Full /help + /invest + pricing" },
  { phase: "Phase 5", title: "Scale", desc: "Community, bounties, partnerships, API" },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center px-[60px] py-20 relative min-h-[600px] flex flex-col items-center justify-center">
        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[
            { top: "12%", left: "15%", size: 2 }, { top: "25%", left: "82%", size: 4 },
            { top: "40%", left: "8%", size: 2 }, { top: "18%", left: "45%", size: 3 },
            { top: "60%", left: "72%", size: 2 }, { top: "35%", left: "28%", size: 3 },
            { top: "55%", left: "90%", size: 2 }, { top: "8%", left: "65%", size: 4 },
            { top: "70%", left: "35%", size: 2 }, { top: "45%", left: "55%", size: 3 },
            { top: "22%", left: "92%", size: 2 }, { top: "65%", left: "12%", size: 3 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: p.top, left: p.left, width: p.size, height: p.size,
                background: i % 3 === 0 ? "rgba(139, 92, 246, 0.7)" : i % 3 === 1 ? "rgba(94, 234, 212, 0.6)" : "rgba(96, 165, 250, 0.6)",
                boxShadow: i % 3 === 0 ? "0 0 12px rgba(139, 92, 246, 0.5)" : i % 3 === 1 ? "0 0 12px rgba(94, 234, 212, 0.4)" : "0 0 12px rgba(96, 165, 250, 0.4)",
              }}
            />
          ))}
        </div>

        <WireframeCourthouse />

        <h1
          className="relative z-[1] text-[72px] font-bold leading-[1.1] tracking-[-2px] max-w-[900px] mb-6"
          style={{ textShadow: "0 0 60px rgba(139, 92, 246, 0.3), 0 0 120px rgba(13, 148, 136, 0.15), 0 8px 32px rgba(0,0,0,0.8)" }}
        >
          They deserve better<br />than nothing.
        </h1>
        <p className="relative z-[1] text-lg font-light text-white/50 tracking-[2px] uppercase mt-4">
          Open Source Legal Help Tools
        </p>
      </section>

      <div className="section-divider" />

      {/* Audience Routing */}
      <section className="py-[60px] px-[60px] pb-20 relative">
        <h2 className="text-center text-sm font-light tracking-[4px] uppercase text-white/35 mb-[60px]">
          Where do you fit in?
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-[1100px] mx-auto" style={{ perspective: "1000px" }}>
          {routeCards.map((card) => (
            <Link
              key={card.path}
              href={card.path}
              className="glass p-9 px-8 w-[200px] text-center cursor-pointer relative overflow-hidden no-underline text-white transition-transform duration-400 hover:scale-105"
              style={{ transform: `translateY(${card.translateY}) ${card.rotate}` }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-25 blur-[40px] -z-[1]"
                style={{ background: card.color }}
              />
              <div className="mb-4 flex items-center justify-center" style={{ filter: `drop-shadow(0 0 12px ${card.color})` }}>
                {card.icon}
              </div>
              <h3 className="text-base font-semibold mb-2 tracking-tight">{card.title}</h3>
              <span className="text-xs font-light text-white/35 tracking-[1px]">{card.path}</span>
              <div
                className="absolute bottom-0 left-[20%] right-[20%] h-0.5 opacity-40 rounded-sm"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Timeline */}
      <section className="py-[100px] px-[60px] relative">
        <h2 className="text-center text-5xl font-bold tracking-[-1.5px] mb-3" style={{ textShadow: "0 0 40px rgba(139, 92, 246, 0.3)" }}>
          The Plan
        </h2>
        <p className="text-center text-sm font-light text-white/40 tracking-[3px] uppercase mb-20">
          A2Jai Phased Rollout
        </p>
        <div className="flex items-start justify-center max-w-[1200px] mx-auto relative px-10">
          <div className="absolute top-[52px] left-20 right-20 h-0.5 z-0" style={{ background: "linear-gradient(90deg, #7c3aed, #6366f1, #0d9488, #06b6d4, #3b82f6)", boxShadow: "0 0 12px rgba(139, 92, 246, 0.4), 0 0 24px rgba(13, 148, 136, 0.2)" }} />
          {timelineNodes.map((node) => (
            <div key={node.phase} className="flex-1 flex flex-col items-center text-center relative z-[1] px-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-white/[0.06] backdrop-blur-[12px] border ${node.active ? "border-[rgba(139,92,246,0.6)]" : "border-white/[0.12]"}`} style={node.active ? { boxShadow: "0 0 24px rgba(139, 92, 246, 0.4), 0 0 48px rgba(139, 92, 246, 0.2)" } : {}}>
                <div className={`w-3 h-3 rounded-full ${node.active ? "bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]" : "bg-white/30"}`} />
              </div>
              <span className={`text-[11px] font-light tracking-[2px] uppercase mb-2 ${node.active ? "text-purple-400" : "text-white/35"}`}>{node.phase}</span>
              <span className={`text-lg font-semibold tracking-tight mb-2.5 ${node.active ? "text-white" : "text-white/50"}`}>{node.title}</span>
              <span className="text-xs font-light text-white/40 leading-relaxed max-w-[160px]">{node.desc}</span>
              {node.active && (
                <span className="inline-block text-[9px] font-semibold tracking-[2px] uppercase text-purple-400 bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-0.5 mt-3">Current</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Manifesto Teaser */}
      <section className="py-[120px] px-[60px] text-center relative">
        <div className="max-w-[800px] mx-auto relative">
          <div className="absolute text-[200px] font-bold text-white/[0.015] -top-10 -left-[60px] tracking-[-8px] pointer-events-none -z-[1]">A2J</div>
          <p className="text-xl font-light tracking-[6px] uppercase text-white/30 mb-5">The A2Jai Manifesto</p>
          <p className="text-[64px] font-bold tracking-[-2px] leading-[1.05] manifesto-gradient mb-4">Access to justice is not a feature.</p>
          <p className="text-[64px] font-light tracking-[-2px] leading-[1.05] text-white/15 mb-8">It is the product.</p>
          <p className="text-base font-light text-white/35 tracking-wide leading-[1.8] max-w-[500px] mx-auto">
            We believe that technology should close the justice gap, not widen it. Every tool we build starts with the people the system forgot.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <EmailCapture />
    </main>
  );
}
