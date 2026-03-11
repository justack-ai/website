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
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "I Need Legal Help | justack.ai",
  description: "Free legal navigation tools to help you understand your rights, your options, and whether you need a lawyer. Not legal advice — legal information.",
};

const issueAreas = [
  {
    title: "Employment",
    desc: "Terminated, laid off, or facing a workplace issue? Understand your rights and what you can do.",
    color: "#ef4444",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="24" height="18" rx="2"/><path d="M12 8V6a4 4 0 0 1 8 0v2"/><line x1="16" y1="16" x2="16" y2="20"/>
      </svg>
    ),
  },
  {
    title: "Housing & Tenancy",
    desc: "Facing eviction, rent disputes, or lease issues? Know your options before you lose your home.",
    color: "#a855f7",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16L16 6l12 10"/><path d="M6 14v12h20V14"/><rect x="12" y="20" width="8" height="6"/>
      </svg>
    ),
  },
  {
    title: "Contracts",
    desc: "Signing a contract, reviewing an agreement, or dealing with a breach? Understand what you're looking at.",
    color: "#3b82f6",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4h16v24H8z"/><line x1="12" y1="10" x2="20" y2="10"/><line x1="12" y1="14" x2="20" y2="14"/><line x1="12" y1="18" x2="16" y2="18"/>
      </svg>
    ),
  },
  {
    title: "Business Formation",
    desc: "Starting a business, incorporating, or setting up a shareholder agreement? Get oriented.",
    color: "#0d9488",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="20" height="24" rx="2"/><line x1="10" y1="10" x2="22" y2="10"/><line x1="10" y1="14" x2="18" y2="14"/><circle cx="20" cy="22" r="4"/>
      </svg>
    ),
  },
  {
    title: "Disputes",
    desc: "Owed money, facing a demand, or in a disagreement you can't resolve? Learn your options.",
    color: "#eab308",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16" y1="4" x2="16" y2="14"/><line x1="8" y1="14" x2="24" y2="14"/><path d="M8 14L5 22"/><path d="M24 14L27 22"/><path d="M2 22Q5 28 8 22"/><path d="M24 22Q27 28 30 22"/>
      </svg>
    ),
  },
  {
    title: "Privacy & Data",
    desc: "Concerned about how your data is being used, or need to understand privacy obligations? Start here.",
    color: "#6366f1",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4L6 8v8c0 6.627 4.477 12.79 10 14 5.523-1.21 10-7.373 10-14V8L16 4z"/><polyline points="12,16 15,19 20,14"/>
      </svg>
    ),
  },
];

const steps = [
  { num: "1", title: "Describe Your Situation", desc: "Tell us what's happening in plain language. No legal jargon required." },
  { num: "2", title: "Get a Clear Assessment", desc: "Our Navigator classifies your situation and identifies what you can handle yourself vs. what needs a lawyer." },
  { num: "3", title: "Choose Your Path", desc: "DIY with checklists and templates, purchase enhanced guidance, or connect with a lawyer." },
];

export default function HelpPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">I Need Legal Help</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          Do I need a lawyer?
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          That is the question most people cannot afford to ask. justack.ai is building tools to help you answer it — for free or at a fraction of the cost of a consultation.
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">How It Works</h2>
        <div className="grid gap-6">
          {steps.map((step) => (
            <div key={step.num} className="glass p-6 flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/[0.15] shrink-0">
                <span className="text-sm font-semibold text-purple-400">{step.num}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Issue Areas */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Common Legal Issues</h2>
        <p className="text-sm font-light text-white/40 mb-8">
          These are the areas our tools are designed to help with. More are coming.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {issueAreas.map((area) => (
            <div key={area.title} className="glass p-6 relative overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-15 blur-[40px] -z-[1]"
                style={{ background: area.color }}
              />
              <div className="mb-3" style={{ filter: `drop-shadow(0 0 8px ${area.color})` }}>
                {area.icon}
              </div>
              <h3 className="text-base font-semibold mb-1">{area.title}</h3>
              <p className="text-sm font-light text-white/50 leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Coming Soon */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">The Navigator</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          We are building an AI-powered legal navigation tool — the <strong className="text-white/80">Navigator</strong> — that guides you through a structured intake, classifies your situation, and produces clear guidance on what you can do yourself versus what requires professional help.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          The Navigator does not provide legal advice. It provides <strong className="text-white/80">navigational guidance</strong> — helping you understand your rights, your options, and the appropriate level of professional help you need. Every output includes a clear disclaimer and a path to a licensed lawyer.
        </p>
        <div className="glass p-6 mt-8">
          <p className="text-sm font-light text-white/40 tracking-[2px] uppercase mb-3">Coming Soon</p>
          <p className="text-base font-light text-white/50 leading-relaxed">
            The Navigator is in active development. Sign up below to be notified when it launches. In the meantime, read our <Link href="/blog" className="text-purple-400 hover:text-purple-300 transition-colors">blog</Link> for legal information resources and updates.
          </p>
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Disclaimer */}
      <section className="mb-16">
        <div className="glass p-6 border-l-2 border-l-amber-500/40">
          <h3 className="text-sm font-semibold tracking-[2px] uppercase text-amber-400/80 mb-3">Important Disclaimer</h3>
          <p className="text-sm font-light text-white/50 leading-relaxed mb-3">
            justack.ai is a product of Humilitas Group Limited, a technology company. <strong className="text-white/70">It is not a law firm.</strong> It does not provide legal advice, legal representation, or legal services.
          </p>
          <p className="text-sm font-light text-white/50 leading-relaxed">
            The tools and information provided by justack.ai are for general informational and educational purposes only and do not constitute legal advice. If you need legal advice, consult a qualified lawyer in your jurisdiction.
          </p>
        </div>
      </section>

      <EmailCapture />
    </main>
  );
}
