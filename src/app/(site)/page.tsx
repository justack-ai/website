/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import {
  liveTools,
  phase1Tools,
  phase2Tools,
  phase3Tools,
  practitionerTools,
  statusConfig,
  practiceAreaColors,
  type RoadmapTool,
} from "@/data/roadmap";

function HomeAppTile({ tool }: { tool: RoadmapTool }) {
  const accent = practiceAreaColors[tool.practiceArea];
  const status = statusConfig[tool.status];
  const linkable = (tool.status === "live" || tool.status === "poc") && tool.href;

  const body = (
    <div className="glass p-5 h-full relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-[40px] -z-[1]"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-semibold tracking-tight">{tool.name}</h3>
        <span
          className="shrink-0 text-[9px] font-semibold tracking-[1.5px] uppercase px-2 py-0.5 rounded-full"
          style={{ color: status.color, background: status.bg, border: `1px solid ${status.color}33` }}
        >
          {status.label}
        </span>
      </div>
      <p className="text-xs font-normal text-white/[0.78] leading-relaxed">
        {tool.description}
      </p>
      {linkable && (
        <span className="inline-block mt-3 text-xs font-medium tracking-wide" style={{ color: accent }}>
          Open tool &rarr;
        </span>
      )}
    </div>
  );

  if (linkable && tool.href) {
    return (
      <a
        href={tool.href}
        target={tool.external ? "_blank" : undefined}
        rel={tool.external ? "noopener noreferrer" : undefined}
        className="block no-underline text-white"
      >
        {body}
      </a>
    );
  }

  return <Link href={`/roadmap#${tool.slug}`} className="block no-underline text-white">{body}</Link>;
}

function HomeAppGroup({ label, tools }: { label: string; tools: RoadmapTool[] }) {
  if (tools.length === 0) return null;
  return (
    <div className="mb-10">
      <p className="text-[12px] font-semibold tracking-[2.5px] uppercase text-violet-400 mb-4">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <HomeAppTile key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}

const routeCards = [
  { title: "I Need Legal Help", path: "/roadmap", color: "#ef4444", rotate: "rotateY(-4deg) rotateX(2deg)", translateY: "0px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="12" r="6"/><path d="M6 30c0-6.627 5.373-12 12-12s12 5.373 12 12"/><path d="M18 22v4M15 26h6"/>
    </svg>
  )},
  { title: "I Want to Build", path: "/build", color: "#a855f7", rotate: "rotateY(3deg) rotateX(-1deg)", translateY: "-20px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="10,12 6,18 10,24"/><polyline points="26,12 30,18 26,24"/><line x1="20" y1="8" x2="16" y2="28"/>
    </svg>
  )},
  { title: "I\u2019m a Lawyer", path: "/lwrtools", color: "#3b82f6", rotate: "rotateY(-3deg) rotateX(1deg)", translateY: "12px", icon: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="4" x2="18" y2="14"/><line x1="10" y1="14" x2="26" y2="14"/><line x1="10" y1="14" x2="7" y2="22"/><line x1="26" y1="14" x2="29" y2="22"/>
      <path d="M4 22 Q7 28 10 22"/><path d="M26 22 Q29 28 32 22"/><rect x="14" y="24" width="8" height="2" rx="1"/><line x1="18" y1="14" x2="18" y2="24"/>
    </svg>
  )},
  { title: "The Opportunity", path: "/invest", color: "#eab308", rotate: "rotateY(4deg) rotateX(-2deg)", translateY: "-12px", icon: (
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
  { phase: "Phase 1", title: "Live Now", desc: "RenterShield, Termtool", active: true },
  { phase: "Phase 2", title: "Criminal Law", desc: "Charter Delay Calculator, Bail Tools" },
  { phase: "Phase 3", title: "Employment", desc: "Severance Calculator, ESA Calculator" },
  { phase: "Phase 4", title: "Family + Platform", desc: "Financial Statements, Court Forms" },
  { phase: "Phase 5", title: "API + MCP", desc: "Programmatic access, AI agent integration" },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 md:px-[60px] py-10 md:py-12 relative flex items-center">
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

        <div className="relative z-[1] w-full max-w-[1100px] mx-auto">
          <div className="text-left">
            {/* Hero image (top band) */}
            <div className="relative rounded-2xl overflow-hidden mb-10">
              <Image
                src="/images/scenes/justack-scene-01-mom-bench.jpg"
                alt="A mother sits alone on a stone bench outside a courthouse, holding a manila folder — waiting, dignified, unhurried."
                width={1920}
                height={823}
                priority
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="w-full h-auto"
              />
            </div>

            {/* Eyebrow */}
            <div className="text-violet-400 text-[11px] md:text-[13px] font-bold uppercase mb-7 md:mb-8 leading-tight" style={{ letterSpacing: "2.5px" }}>
              <span>OPEN SOURCE</span>
              <span className="inline-block w-[4px] h-[4px] md:w-[5px] md:h-[5px] rounded-full bg-violet-400 mx-2 md:mx-2.5 align-middle" />
              <span>MPL-2.0</span>
              <span className="inline-block w-[4px] h-[4px] md:w-[5px] md:h-[5px] rounded-full bg-violet-400 mx-2 md:mx-2.5 align-middle" />
              <span>BUILT IN CANADA BY </span>
              <a
                href="https://mjbryant.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline decoration-2 underline-offset-4 hover:text-violet-300 transition-colors"
              >
                MICHAEL BRYANT
              </a>
            </div>

            {/* Headline */}
            <h1 className="text-[48px] md:text-[88px] lg:text-[108px] font-extrabold leading-[0.98] tracking-[-3.5px] mb-7">
              Open source legal help apps for{" "}
              <em className="not-italic text-violet-400 font-extrabold">everyone else.</em>
            </h1>

            {/* Lede */}
            <p className="text-[17px] md:text-[19px] text-white/[0.78] leading-[1.55] max-w-[560px] mb-3 font-normal">
              Open source software for everyone the legal system forgot. Forkable by clinics, law schools, public-interest orgs.
            </p>
            <p className="text-[15px] md:text-[16px] text-white/[0.62] leading-[1.55] max-w-[560px] mb-9 font-normal">
              (And for solo and small firms forgotten by legal tech catering to Big Law &mdash; apps for you too.)
            </p>

            {/* Four doors */}
            <div className="grid grid-cols-2 gap-3 max-w-[520px]">
              <Link href="/roadmap" className="group bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between no-underline text-white hover:border-violet-400 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all">
                <span className="text-[15px] font-semibold tracking-[-0.2px]">Try a tool</span>
                <span className="text-violet-400 font-semibold">&rarr;</span>
              </Link>
              <Link href="/a2jai" className="group bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between no-underline text-white hover:border-violet-400 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all">
                <span className="text-[15px] font-semibold tracking-[-0.2px]">Why apps?</span>
                <span className="text-violet-400 font-semibold">&rarr;</span>
              </Link>
              <Link href="/roadmap" className="group bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between no-underline text-white hover:border-violet-400 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all">
                <span className="text-[15px] font-semibold tracking-[-0.2px]">See the roadmap</span>
                <span className="text-violet-400 font-semibold">&rarr;</span>
              </Link>
              <a href="https://github.com/justack-ai/website" target="_blank" rel="noopener noreferrer" className="group bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between no-underline text-white hover:border-violet-400 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all">
                <span className="text-[15px] font-semibold tracking-[-0.2px]">View the source</span>
                <span className="text-violet-400 font-semibold">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap CTA */}
      <div className="text-center -mt-2 mb-10 relative z-[1]">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-3 text-white text-[13px] font-semibold tracking-[1.2px] uppercase no-underline border border-violet-400 rounded-full px-7 py-3.5 hover:bg-violet-400 hover:text-[#08080F] transition-colors"
        >
          <span>See what we&apos;re building</span>
          <span className="text-violet-400 group-hover:text-[#08080F]">&rarr;</span>
        </Link>
      </div>

      <div className="section-divider" />

      {/* Apps grid — what is actually shipped */}
      <section className="px-6 md:px-[60px] pt-12 md:pt-16 pb-8 max-w-[1280px] mx-auto w-full">
        <HomeAppGroup label="Live Now" tools={liveTools} />
        <HomeAppGroup label="Practitioner Tools" tools={practitionerTools} />
        <HomeAppGroup label="Criminal Law" tools={phase1Tools} />
        <HomeAppGroup label="Employment + Consumer" tools={phase2Tools} />
        <HomeAppGroup label="Family + Platform" tools={phase3Tools} />
        <div className="text-center mt-8">
          <Link href="/roadmap" className="text-sm font-medium text-white/[0.78] tracking-[1.5px] uppercase no-underline hover:text-violet-400 transition-colors">
            Full roadmap &rarr;
          </Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* Audience Routing */}
      <section className="py-[60px] px-6 md:px-[60px] pb-20 relative">
        <h2 className="text-center text-base md:text-lg font-semibold tracking-[2.5px] uppercase text-white mb-[60px]">
          Where do you fit in?
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-[1100px] mx-auto" style={{ perspective: "1000px" }}>
          {routeCards.map((card) => (
            <Link
              key={card.path}
              href={card.path}
              className="glass p-6 md:p-9 px-6 md:px-8 w-[calc(50%-8px)] md:w-[200px] text-center cursor-pointer relative overflow-hidden no-underline text-white transition-transform duration-400 hover:scale-105"
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
              {card.path !== "/roadmap" && (
                <span className="text-xs font-light text-white/35 tracking-[1px]">{card.path}</span>
              )}
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
      <section className="py-[60px] md:py-[100px] px-6 md:px-[60px] relative overflow-hidden">
        <h2 className="text-center text-5xl font-bold tracking-[-1.5px] mb-3" style={{ textShadow: "0 0 40px rgba(139, 92, 246, 0.3)" }}>
          The Plan
        </h2>
        <p className="text-center text-sm font-light text-white/40 tracking-[3px] uppercase mb-20">
          Build Sequence
        </p>
        <div className="flex flex-col md:flex-row items-start justify-center max-w-[1200px] mx-auto relative px-4 md:px-10 gap-6 md:gap-0">
          <div className="hidden md:block absolute top-[52px] left-20 right-20 h-0.5 z-0" style={{ background: "linear-gradient(90deg, #7c3aed, #6366f1, #0d9488, #06b6d4, #3b82f6)", boxShadow: "0 0 12px rgba(139, 92, 246, 0.4), 0 0 24px rgba(13, 148, 136, 0.2)" }} />
          {timelineNodes.map((node) => (
            <div key={node.phase} className="flex-1 flex flex-row md:flex-col items-center md:items-center text-left md:text-center relative z-[1] px-2 gap-4 md:gap-0">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 md:mb-5 bg-white/[0.06] backdrop-blur-[12px] border ${node.active ? "border-[rgba(139,92,246,0.6)]" : "border-white/[0.12]"}`} style={node.active ? { boxShadow: "0 0 24px rgba(139, 92, 246, 0.4), 0 0 48px rgba(139, 92, 246, 0.2)" } : {}}>
                <div className={`w-3 h-3 rounded-full ${node.active ? "bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]" : "bg-white/30"}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-xs md:text-[11px] font-light tracking-[2px] uppercase mb-1 md:mb-2 ${node.active ? "text-purple-400" : "text-white/35"}`}>{node.phase}</span>
                <span className={`text-base md:text-lg font-semibold tracking-tight mb-1 md:mb-2.5 ${node.active ? "text-white" : "text-white/50"}`}>{node.title}</span>
                <span className="text-xs font-light text-white/40 leading-relaxed max-w-[200px] md:max-w-[160px]">{node.desc}</span>
                {node.active && (
                  <span className="inline-block self-start md:self-center text-[10px] md:text-[9px] font-semibold tracking-[2px] uppercase text-purple-400 bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-0.5 mt-2 md:mt-3">Current</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Manifesto Link */}
      <section className="py-12 md:py-16 px-6 md:px-[60px] text-center">
        <Link href="/a2jai" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[1.5px] uppercase text-white/[0.78] hover:text-violet-400 transition-colors">
          Read the A2Jai Manifesto <span className="text-violet-400">&rarr;</span>
        </Link>
      </section>

      <div className="section-divider" />

      <EmailCapture />
    </main>
  );
}
