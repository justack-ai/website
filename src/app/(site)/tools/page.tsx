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
  title: "For Lawyers | justack.ai",
  description: "Flat-fee legal services infrastructure for legal professionals. Defined-scope, transparent pricing, AI-augmented delivery.",
};

interface Service {
  name: string;
  desc: string;
  range: string;
  turnaround?: string;
  note?: string;
}

interface ServiceCategory {
  category: string;
  color: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    category: "Employment",
    color: "#ef4444",
    services: [
      {
        name: "Termination Offer Review",
        desc: "Review termination letter and release, written assessment, annotated markup. Available as review-only, review + counterproposal, or capped negotiation.",
        range: "$650 \u2013 $9,500",
        turnaround: "48 hours (review tier)",
      },
      {
        name: "Employer Termination Kit",
        desc: "Termination letter options, release, statutory compliance checklist, documentation checklist, file note template, delivery script. Optional strategy call.",
        range: "$950 \u2013 $3,250",
      },
    ],
  },
  {
    category: "Business Formation & Governance",
    color: "#0d9488",
    services: [
      {
        name: "Incorporation + Minute Book Launch Pack",
        desc: "Incorporation, organizing resolutions, share issuance and registers, digital minute book, first-year compliance checklist. Optional founder basics add-on.",
        range: "$1,250 \u2013 $5,500",
        note: "Plus government fees and disbursements.",
      },
      {
        name: "Shareholder Agreement Lite",
        desc: "Modular shareholder agreement with vesting provisions, transfer restrictions, confidentiality, deadlock pathway, dispute resolution clause. Includes review call.",
        range: "$3,500 \u2013 $8,500",
      },
    ],
  },
  {
    category: "Contracts",
    color: "#3b82f6",
    services: [
      {
        name: "Single Contract Review & Redline",
        desc: "Issue list, redlines, and fallback clause options for simple agreements. Risk-ranked analysis and negotiation positions for MSA-level agreements.",
        range: "$450 \u2013 $3,500",
      },
      {
        name: "Contract Redline Subscription",
        desc: "Monthly retainer for ongoing contract review. Light tier (up to 4/month) or Core tier (up to 10/month) with 48-hour turnaround targets.",
        range: "$1,500 \u2013 $7,500/month",
      },
    ],
  },
  {
    category: "Disputes",
    color: "#eab308",
    services: [
      {
        name: "Demand Letter + Settlement Kit",
        desc: "Fact matrix, legal theory options, lawyer-signed demand letter, settlement term sheet template. Optional settlement agreement drafting.",
        range: "$950 \u2013 $4,500",
      },
    ],
  },
  {
    category: "Commercial Leasing",
    color: "#a855f7",
    services: [
      {
        name: "Lease Review + Redline (Tenant-Side)",
        desc: "Review of commercial lease, issue list, risk summary, and redlined lease with fallback positions. Non-residential leases only.",
        range: "From $750",
      },
    ],
  },
  {
    category: "Privacy & AI Governance",
    color: "#6366f1",
    services: [
      {
        name: "Privacy + AI Use Baseline Pack",
        desc: "Public and internal privacy policies, breach response plan, vendor DPA template, vendor intake checklist, internal AI-use policy, practical guidance.",
        range: "$2,500 \u2013 $7,500",
        turnaround: "2\u20133 weeks",
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">For Lawyers</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          The Flat-Fee Model
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          Defined-scope. Transparent pricing. AI-augmented delivery. Legal services designed for how work actually gets done.
        </p>
      </div>

      {/* The Model */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">How It Works</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          Every service is scoped in advance. Clients know exactly what they are getting and what it costs before they commit. Lawyers deliver defined work products within defined timelines. No surprises on either side.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          The flat-fee model works because AI handles the bulk of research, drafting, and review at near-zero marginal cost. Lawyers focus on judgment, strategy, and quality assurance — the work that actually requires a licence.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          All final legal deliverables are reviewed and approved by a licensed lawyer. Technology supports efficiency. It does not replace professional judgment.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Service Catalogue */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Service Catalogue</h2>
        <p className="text-sm font-light text-white/40 mb-8">
          Available in Ontario and British Columbia. Excludes real estate.
        </p>
        <div className="grid gap-8">
          {serviceCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <h3 className="text-lg font-semibold tracking-tight">{cat.category}</h3>
              </div>
              <div className="grid gap-4">
                {cat.services.map((svc) => (
                  <div key={svc.name} className="glass p-6 relative overflow-hidden">
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-[30px] -z-[1]"
                      style={{ background: cat.color }}
                    />
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <h4 className="text-base font-semibold">{svc.name}</h4>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-medium text-purple-300">{svc.range}</span>
                        {svc.turnaround && (
                          <span className="text-xs font-light text-white/30">{svc.turnaround}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-light text-white/50 leading-relaxed">{svc.desc}</p>
                    {svc.note && (
                      <p className="text-xs font-light text-white/30 mt-2 italic">{svc.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Scope & Exclusions */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Scope & Exclusions</h2>
        <div className="glass p-6 border-l-2 border-l-amber-500/40">
          <p className="text-sm font-light text-white/50 leading-relaxed mb-4">
            All flat-fee services are defined-scope engagements. They are designed for matters that can be bounded in advance and delivered to a defined standard.
          </p>
          <p className="text-sm font-semibold text-white/60 mb-2">Excluded from flat-fee services:</p>
          <ul className="text-sm font-light text-white/50 leading-relaxed list-disc pl-5 space-y-1">
            <li>Active litigation and tribunal proceedings</li>
            <li>Criminal and regulatory defence</li>
            <li>Tax planning and tax disputes</li>
            <li>Real estate transactions</li>
            <li>Family law matters</li>
            <li>Immigration matters</li>
            <li>Matters requiring court appearances</li>
          </ul>
          <p className="text-sm font-light text-white/40 mt-4">
            If your matter falls outside these services, we can refer you to qualified counsel. Contact us at{" "}
            <a href="mailto:michael@justack.ai" className="text-purple-400 hover:text-purple-300 transition-colors">michael@justack.ai</a>.
          </p>
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* For the Network */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Join the Network</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          We are building a network of lawyers who deliver flat-fee legal services through the justack.ai platform. If you are a licensed lawyer in Ontario or British Columbia who is interested in serving clients through a defined-scope, AI-augmented delivery model, we want to hear from you.
        </p>
        <a
          href="mailto:michael@justack.ai"
          className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline"
        >
          michael@justack.ai
        </a>
      </section>

      <EmailCapture />
    </main>
  );
}
