/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
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

type GroupSpec = { label: string; tools: RoadmapTool[] };

export default function BelowFoldGroups({ groups }: { groups: GroupSpec[] }) {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: shown ? undefined : 200 }}>
      {shown && groups.map((g) => <HomeAppGroup key={g.label} label={g.label} tools={g.tools} />)}
    </div>
  );
}
