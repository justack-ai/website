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

import type { Metadata } from "next";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Invest | justack.ai",
  description: "The access-to-justice market in Canada represents a multi-billion dollar opportunity. Learn about A2Jai's approach.",
};

const marketStats = [
  { value: "5.4M", label: "Canadians face a serious legal problem each year" },
  { value: "78%", label: "receive no professional legal help" },
  { value: "$15.7B", label: "Canadian legal services market (annual)" },
  { value: "$5\u2013$7B", label: "estimated underserved consumer market" },
];

const tiers = [
  {
    name: "Free Triage",
    desc: "Basic assessment and high-level answer to 'Do I need a lawyer?' Creates awareness and the top of the funnel.",
    color: "#0d9488",
  },
  {
    name: "Navigator (Paid Product)",
    desc: "Full guidance report with personalized checklists, templates, rationale, and document review summaries. The core purchasable product.",
    color: "#7c3aed",
  },
  {
    name: "Consult Connect (Flat-Fee Services)",
    desc: "Direct booking into defined-scope, flat-fee legal services with transparent pricing. Pre-prepared case summaries reduce friction for both sides.",
    color: "#3b82f6",
  },
];

export default function InvestPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">Invest</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          The Opportunity
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          The legal system in Canada works for those who can pay. For everyone else, it does not. A2Jai is building the product infrastructure to close that gap — and serve a market that has been left on the table for decades.
        </p>
      </div>

      {/* Market */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">The Market</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketStats.map((stat) => (
            <div key={stat.label} className="glass p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold tracking-tight manifesto-gradient mb-2">{stat.value}</div>
              <p className="text-xs font-light text-white/40 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-light text-white/25 mt-4 text-center">
          Sources: Canadian Legal Problems Survey via CBA National Magazine; Statistics Canada; Supreme Court of Canada.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Problem */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">The Problem</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          Each year, 5.4 million Canadians experience a serious legal problem. Of those, only 29% contact a lawyer. Of the lawyer contacts that do occur, 24% result in no help at all, and 41% address only part of the problem.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          A million Canadians say they want more legal assistance but do not seek it. The reasons are consistent: cost, confusion about what help is available, and a pervasive belief — often correct — that the system is not designed for them.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          The Supreme Court of Canada has called this a &ldquo;culture of complacency.&rdquo; The legal profession holds a monopoly over access to the system and, simultaneously, over its inaccessibility.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Business Model */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">The Business Model</h2>
        <p className="text-sm font-light text-white/40 mb-8">
          Three tiers. Self-sustaining economics. Mission-aligned.
        </p>
        <div className="grid gap-5">
          {tiers.map((tier, i) => (
            <div key={tier.name} className="glass p-6 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-15 blur-[40px] -z-[1]"
                style={{ background: tier.color }}
              />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/[0.15]">
                  <span className="text-xs font-semibold text-purple-400">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
              </div>
              <p className="text-sm font-light text-white/50 leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-light text-white/40 mt-6 leading-relaxed">
          Tier 1 creates the funnel. Tier 2 generates product revenue. Tier 3 connects to legal services revenue. The open-source layer ensures the mission extends beyond any single revenue stream.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* What's Built */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">What Is Already Built</h2>
        <div className="grid gap-4">
          {[
            { name: "justack.ai", desc: "Platform under active development with manifesto, blog, and core architecture. Built on Next.js and Vercel." },
            { name: "Flat-Fee Services", desc: "Structured menu of defined-scope, flat-fee legal services across six practice areas — available in Ontario and British Columbia." },
            { name: "Navigator", desc: "'Do I Need a Lawyer?' consumer navigation tool — in active development. AI-powered triage, guided intake, and guidance reports." },
            { name: "AI Ops Pipeline", desc: "Content generation infrastructure with SlateAgent, PRDraftAgent, QualityGateAgent, and multi-model inference router." },
          ].map((item) => (
            <div key={item.name} className="glass p-5">
              <h3 className="text-base font-semibold mb-1">{item.name}</h3>
              <p className="text-sm font-light text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Open Source */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">The Open Source Commitment</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          A2Jai maintains a structural commitment to open source. Public tools are released under the Apache 2.0 licence. Commercial products — the Navigator, flat-fee service delivery tools — sustain the enterprise. The infrastructure is designed to be reusable by legal aid organizations, academic researchers, and other developers.
        </p>
        <blockquote className="border-l-2 border-purple-500/40 pl-6 py-2">
          <p className="text-base font-light text-white/50 italic">
            &ldquo;The commercial side funds the mission. The open-source side fulfils it.&rdquo;
          </p>
        </blockquote>
      </section>

      <div className="section-divider mb-16" />

      {/* Founder */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">The Founder</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          <strong className="text-white/80">Michael Bryant</strong> served as Attorney General of Ontario from 2003 to 2007, overseeing one of the largest justice systems in North America. He subsequently served as CEO of the Canadian Civil Liberties Association and CEO of Legal Aid BC — one of the largest legal aid organizations in Canada.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          His professional career spans government, non-profit leadership, Indigenous partnerships, and legal technology. He has experienced the justice system from its most privileged corridors to its most unforgiving depths — and that range of experience informs every product A2Jai builds.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Roadmap */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Roadmap</h2>
        <div className="grid gap-4">
          {[
            { phase: "Now", title: "Foundation", items: ["Platform live with manifesto, blog, core architecture", "Flat-fee services menu structured in Ontario and British Columbia", "Navigator product in active development", "Architecture specification and AI prompt framework complete"] },
            { phase: "Next", title: "Product Launch", items: ["Navigator MVP: guided intake, AI triage, guidance, lawyer handoff", "Pilot with limited cohort for quality validation", "Payment integration for product purchase and service booking", "Legal compliance review and law society alignment"] },
            { phase: "Later", title: "Scale", items: ["Expanded jurisdiction coverage", "Template library across all service categories", "Attorney marketplace beyond in-house services", "Open-source community growth and third-party integrations"] },
          ].map((r) => (
            <div key={r.phase} className="glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-purple-400 bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-0.5">
                  {r.phase}
                </span>
                <h3 className="text-base font-semibold">{r.title}</h3>
              </div>
              <ul className="text-sm font-light text-white/50 leading-relaxed list-disc pl-5 space-y-1">
                {r.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Contact */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Get in Touch</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-6">
          A2Jai is open to conversations with investors who understand regulated markets and mission-aligned technology businesses.
        </p>
        <div className="glass p-6">
          <p className="text-base font-semibold mb-1">Michael Bryant</p>
          <p className="text-sm font-light text-white/50">Founder, A2Jai | justack.ai</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a href="mailto:michael@justack.ai" className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline">
              michael@justack.ai
            </a>
            <a href="https://linkedin.com/in/michaelbryant" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-white/[0.08] border border-white/[0.15] text-white text-sm font-semibold rounded-xl hover:bg-white/[0.12] transition-colors no-underline">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <EmailCapture />
    </main>
  );
}
