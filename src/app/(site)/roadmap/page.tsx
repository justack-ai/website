/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";
import {
  liveTools,
  phase1Tools,
  phase2Tools,
  phase3Tools,
  practitionerTools,
  statusConfig,
  practiceAreaColors,
  practiceAreaLabels,
  type RoadmapTool,
} from "@/data/roadmap";
import RoadmapEmailCapture from "./RoadmapEmailCapture";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Roadmap | justack.ai",
  description:
    "See what justack.ai is building: legal help tools for housing, criminal law, employment, family law, and practitioner workflows. Every tool includes API + MCP access.",
};

function StatusBadge({ status }: { status: RoadmapTool["status"] }) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-block text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full"
      style={{ color: config.color, background: config.bg, border: `1px solid ${config.color}33` }}
    >
      {config.label}
    </span>
  );
}

function PracticeTag({ area }: { area: RoadmapTool["practiceArea"] }) {
  const color = practiceAreaColors[area];
  return (
    <span
      className="inline-block text-[9px] font-light tracking-[2px] uppercase"
      style={{ color: `${color}aa` }}
    >
      {practiceAreaLabels[area]}
    </span>
  );
}

function ToolCard({ tool }: { tool: RoadmapTool }) {
  const accentColor = practiceAreaColors[tool.practiceArea];

  return (
    <div className="glass p-6 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-10 blur-[40px] -z-[1]"
        style={{ background: accentColor }}
      />
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold tracking-tight">{tool.name}</h3>
          <StatusBadge status={tool.status} />
        </div>
        <PracticeTag area={tool.practiceArea} />
      </div>
      <p className="text-sm font-light text-white/50 leading-relaxed mb-4">
        {tool.description}
      </p>

      {tool.status === "live" && tool.href ? (
        <a
          href={tool.href}
          target={tool.external ? "_blank" : undefined}
          rel={tool.external ? "noopener noreferrer" : undefined}
          className="inline-block text-sm font-medium tracking-wide no-underline transition-colors"
          style={{ color: accentColor }}
        >
          Open tool &rarr;
        </a>
      ) : (
        <RoadmapEmailCapture toolSlug={tool.slug} toolName={tool.name} accentColor={accentColor} />
      )}
    </div>
  );
}

function ToolSection({
  label,
  title,
  tools,
  accentColor,
}: {
  label: string;
  title: string;
  tools: RoadmapTool[];
  accentColor: string;
}) {
  return (
    <section className="mb-20">
      <div className="mb-8">
        <span
          className="text-[11px] font-light tracking-[4px] uppercase mb-2 block"
          style={{ color: accentColor }}
        >
          {label}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default function RoadmapPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">
          Roadmap
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          What we&apos;re building
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          Legal help tools for people who need them. Open source where possible, affordable where not.
        </p>
      </div>

      {/* API + MCP badge */}
      <div className="glass p-5 mb-16 border-l-2 border-l-indigo-500/40">
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-0.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" />
              <path d="M7 13h2l2-4 2 6 2-3h2" />
              <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80 mb-1">
              Every tool includes API + MCP access
            </p>
            <p className="text-sm font-light text-white/40 leading-relaxed">
              Build legal workflows programmatically. All tools available via API and MCP-compatible for AI agent integration.
            </p>
          </div>
        </div>
      </div>

      {/* Live Tools */}
      <ToolSection
        label="Available Now"
        title="Live Tools"
        tools={liveTools}
        accentColor="#22c55e"
      />

      <div className="section-divider mb-16" />

      {/* Phase I */}
      <ToolSection
        label="Phase I"
        title="Criminal Law"
        tools={phase1Tools}
        accentColor="#ef4444"
      />

      {/* Phase II */}
      <ToolSection
        label="Phase II"
        title="Employment + Consumer"
        tools={phase2Tools}
        accentColor="#eab308"
      />

      {/* Phase III */}
      <ToolSection
        label="Phase III"
        title="Family Law + Platform"
        tools={phase3Tools}
        accentColor="#3b82f6"
      />

      <div className="section-divider mb-16" />

      {/* Practitioner Tools */}
      <ToolSection
        label="For Lawyers"
        title="Practitioner Tools"
        tools={practitionerTools}
        accentColor="#0d9488"
      />

      <div className="section-divider mb-16" />

      {/* Footer CTA */}
      <EmailCapture />
    </main>
  );
}
