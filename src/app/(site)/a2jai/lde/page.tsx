/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

/* ── The three LDE output panels ── */
const panels = [
  {
    number: "01",
    label: "Hesitation",
    title: "What We Don't Know Yet",
    description:
      "Before any analysis, LDE identifies what is missing: facts that haven't been stated, jurisdiction that hasn't been confirmed, legal standards that apply but haven't been addressed. You can't reason honestly about a situation you don't fully understand.",
    color: "rgba(234, 179, 8, 0.5)",
    glow: "rgba(234, 179, 8, 0.08)",
    accent: "#eab308",
  },
  {
    number: "02",
    label: "Adversarial",
    title: "Both Sides, Honestly",
    description:
      "LDE builds the strongest plausible case for each side of your situation — grounded to actual legal authorities, not conjecture. Every proposition is either linked to a retrieved authority excerpt or explicitly flagged as a hypothesis. No false certainty.",
    color: "rgba(139, 92, 246, 0.5)",
    glow: "rgba(139, 92, 246, 0.08)",
    accent: "#8b5cf6",
  },
  {
    number: "03",
    label: "Next Questions",
    title: "What to Ask Next",
    description:
      "LDE produces prioritized clarifying questions and targeted hypotheticals — the facts that, if different, would change the analysis. Understanding which facts matter is often more valuable than a premature answer.",
    color: "rgba(13, 148, 136, 0.5)",
    glow: "rgba(13, 148, 136, 0.08)",
    accent: "#0d9488",
  },
];

/* ── Non-negotiable design principles ── */
const principles = [
  {
    label: "Hesitation first",
    desc: "LDE always leads with what it does not know. Confident analysis built on missing facts is worse than no analysis.",
  },
  {
    label: "No orphan propositions",
    desc: "Every legal claim is either grounded to a retrieved authority excerpt or explicitly marked as a hypothesis. There is no middle ground.",
  },
  {
    label: "Assumptions visible",
    desc: "LDE surfaces assumptions, missing facts, and which rules were applied. You see the reasoning, not just the result.",
  },
  {
    label: "No outcome prediction",
    desc: "LDE does not predict what a court will decide. It helps you understand the terrain. Prediction is not in scope — and that is a feature, not a limitation.",
  },
];

export default function LDEPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">

      {/* ── Hero ── */}
      <div className="mb-24 relative">
        <div
          className="absolute top-0 left-0 w-[400px] h-[300px] rounded-full opacity-15 blur-[120px] -z-[1]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)" }}
        />

        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">
          A2Jai ·{" "}
          <Link href="/a2jai" className="text-violet-400/60 hover:text-violet-400 transition-colors no-underline">
            The Mission
          </Link>
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-2px] leading-[1.05] manifesto-gradient mb-6">
          Legal Dialectic Engine
        </h1>
        <p className="text-xl font-light text-white/50 leading-relaxed max-w-[680px] mb-3">
          Tell your story. Get both sides.
        </p>
        <p className="text-base font-light text-white/35 leading-[1.8] max-w-[680px]">
          LDE is a neuro-symbolic legal reasoning engine for Canadians navigating the legal system
          without a lawyer. It does not predict outcomes or replace legal counsel. It gives you what
          you need most: an honest map of both sides of your situation, grounded to real legal
          authorities — and a clear view of what is still unknown.
        </p>

        {/* Status badge */}
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-500/5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-light tracking-[2px] uppercase text-amber-400/70">
            Early Development · Canadian Law (v0.1)
          </span>
        </div>
      </div>

      {/* ── Three output panels ── */}
      <section className="mb-24">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/25 mb-10">
          How It Works
        </p>
        <div className="space-y-6">
          {panels.map((panel) => (
            <div
              key={panel.number}
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${panel.glow} 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${panel.color.replace("0.5", "0.15")}`,
                borderLeft: `3px solid ${panel.color}`,
              }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-[60px] -z-[1]"
                style={{ background: panel.accent }}
              />

              <div className="flex items-start gap-6">
                <div
                  className="text-4xl font-bold tracking-[-2px] leading-none shrink-0 opacity-20"
                  style={{ color: panel.accent }}
                >
                  {panel.number}
                </div>
                <div>
                  <span
                    className="text-[11px] font-light tracking-[3px] uppercase mb-2 block"
                    style={{ color: panel.color }}
                  >
                    {panel.label}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight mb-3">{panel.title}</h3>
                  <p className="text-base font-light text-white/55 leading-[1.8]">
                    {panel.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-24" />

      {/* ── Design principles ── */}
      <section className="mb-24">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/25 mb-3">
          Design Principles
        </p>
        <h2 className="text-3xl font-bold tracking-[-1px] mb-10">
          Built on Honest Constraints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((p) => (
            <div
              key={p.label}
              className="glass p-6"
            >
              <p className="text-sm font-semibold tracking-tight mb-2 text-white/90">{p.label}</p>
              <p className="text-sm font-light text-white/45 leading-[1.75]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-24" />

      {/* ── Scope + context ── */}
      <section className="mb-24">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/25 mb-3">
          Current Scope
        </p>
        <h2 className="text-3xl font-bold tracking-[-1px] mb-6">
          Canadian Law · v0.1
        </h2>
        <p className="text-base font-light text-white/55 leading-[1.8] mb-6 max-w-[720px]">
          The first version of LDE focuses on two domains of Canadian law: negligence (duty, breach,
          causation, remoteness) and administrative law (procedural fairness, reasonableness review).
          Authority retrieval uses CanLII as its primary source.
        </p>
        <p className="text-base font-light text-white/40 leading-[1.8] max-w-[720px]">
          LDE is a proof-of-concept. It is not a lawyer and does not provide legal advice. Where the
          engine cannot verify a claim, it will say so. That is the point.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {["Negligence", "Admin Law", "CanLII Authority Retrieval", "Canadian Jurisdictions"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full text-xs font-light tracking-[1px] uppercase border border-white/10 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="section-divider mb-24" />

      {/* ── Mission link ── */}
      <section className="mb-24">
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(13,148,136,0.05) 100%)",
            border: "1px solid rgba(139,92,246,0.12)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full opacity-10 blur-[80px] -z-[1]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6), transparent 70%)" }}
          />
          <p className="text-sm font-light tracking-[3px] uppercase text-violet-400/50 mb-3">
            Part of A2Jai
          </p>
          <h3 className="text-2xl font-bold tracking-[-0.5px] mb-3">
            The Access-to-Justice Mission
          </h3>
          <p className="text-base font-light text-white/50 leading-[1.8] mb-6 max-w-[600px]">
            LDE is A2Jai&apos;s flagship tool for non-lawyers — the engine that turns a person&apos;s
            account of their situation into structured legal analysis. Read the full manifesto for
            why this matters.
          </p>
          <Link
            href="/a2jai"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors no-underline"
          >
            Read the A2Jai Manifesto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Early access ── */}
      <EmailCapture />
    </main>
  );
}
