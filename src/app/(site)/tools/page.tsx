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
  description: "Join the justack.ai lawyer network. AI-augmented legal service delivery for licensed professionals.",
};

export default function ToolsPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">For Lawyers</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          Build With Us
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          justack.ai is building infrastructure that connects people who need legal help with lawyers who can provide it. We are looking for licensed professionals who want to be part of that.
        </p>
      </div>

      {/* The Vision */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">What We Are Building</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          The Navigator is an AI-powered legal navigation tool that helps people determine whether they need a lawyer, understand their options, and connect with the right professional. It is currently in active development.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          When a person needs professional help, the Navigator will connect them with a lawyer in our network. AI handles triage, intake preparation, and case summary generation — so lawyers receive well-organized matters from day one.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          Technology supports efficiency. It does not replace professional judgment. All legal services are delivered by licensed lawyers.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Practice Areas */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Practice Areas</h2>
        <p className="text-sm font-light text-white/40 mb-8">
          Currently focused on Ontario and British Columbia.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { area: "Employment", color: "#ef4444" },
            { area: "Business Formation & Governance", color: "#0d9488" },
            { area: "Contracts", color: "#3b82f6" },
            { area: "Disputes", color: "#eab308" },
            { area: "Commercial Leasing", color: "#a855f7" },
            { area: "Privacy & AI Governance", color: "#6366f1" },
          ].map((item) => (
            <div key={item.area} className="glass p-5 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-[30px] -z-[1]"
                style={{ background: item.color }}
              />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-sm font-semibold">{item.area}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs font-light text-white/30 mt-4">
          Excludes real estate, family law, criminal law, immigration, tax, and matters requiring court appearances.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Join the Network */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Join the Network</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          We are building a network of lawyers who deliver legal services through the justack.ai platform. If you are a licensed lawyer in Ontario or British Columbia who is interested in serving clients through an AI-augmented delivery model, we want to hear from you.
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
