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
  title: "Build with Us | justack.ai",
  description: "justack.ai is open source. Contribute to access-to-justice tools built on Apache 2.0. Join the community.",
};

const repos = [
  {
    name: "justack-ai/website",
    desc: "This website — the justack.ai platform. Next.js, React, Sanity CMS, Tailwind CSS.",
    lang: "TypeScript",
    license: "Apache 2.0",
    color: "#3178c6",
  },
  {
    name: "justack-ai/navigator",
    desc: "The 'Do I Need a Lawyer?' consumer navigation tool. AI-powered legal triage and guidance.",
    lang: "TypeScript",
    license: "Apache 2.0",
    color: "#3178c6",
    soon: true,
  },
  {
    name: "justack-ai/intake-schemas",
    desc: "Structured intake schemas for legal issue classification. Reusable by legal aid orgs and researchers.",
    lang: "JSON / TypeScript",
    license: "Apache 2.0",
    color: "#0d9488",
    soon: true,
  },
  {
    name: "justack-ai/triage-classifier",
    desc: "Legal issue triage classifier. Maps user input to case categories, urgency, and jurisdiction.",
    lang: "Python / TypeScript",
    license: "Apache 2.0",
    color: "#3572A5",
    soon: true,
  },
];

const principles = [
  {
    title: "Apache 2.0 Licensed",
    desc: "Our core tools are open source under the most permissive widely-used license. Use, modify, and distribute freely.",
  },
  {
    title: "Built for Reuse",
    desc: "Intake schemas, triage classifiers, and compliance frameworks are designed to be composable. Legal aid organizations can deploy them independently.",
  },
  {
    title: "Privacy First",
    desc: "Legal data is sensitive. Our tools are built with privacy as a foundational principle. Minimal data collection, encryption by default.",
  },
  {
    title: "Community Governed",
    desc: "Roadmap is public. Issues are open. We welcome contributions from developers, legal professionals, and researchers.",
  },
];

export default function BuildPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">I Want to Build</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          Build Access to Justice
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          justack.ai is open source. The tools that close the justice gap should be public goods — available to anyone who wants to build on them.
        </p>
      </div>

      {/* Principles */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Open Source Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((p) => (
            <div key={p.title} className="glass p-6">
              <h3 className="text-base font-semibold mb-2">{p.title}</h3>
              <p className="text-sm font-light text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Repositories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Repositories</h2>
        <p className="text-sm font-light text-white/40 mb-8">
          Our code lives on GitHub. Repositories marked &ldquo;coming soon&rdquo; are in active development.
        </p>
        <div className="grid gap-4">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.soon ? undefined : `https://github.com/${repo.name}`}
              target={repo.soon ? undefined : "_blank"}
              rel={repo.soon ? undefined : "noopener noreferrer"}
              className={`glass p-6 block no-underline text-white ${repo.soon ? "opacity-70 cursor-default" : "hover:scale-[1.01] transition-transform cursor-pointer"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold tracking-tight">{repo.name}</h3>
                    {repo.soon && (
                      <span className="text-[11px] font-semibold tracking-[2px] uppercase text-purple-400 bg-purple-500/15 border border-purple-500/30 rounded-full px-2.5 py-0.5">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-3">{repo.desc}</p>
                  <div className="flex items-center gap-4 text-xs font-light text-white/30">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: repo.color }} />
                      {repo.lang}
                    </span>
                    <span>{repo.license}</span>
                  </div>
                </div>
                {!repo.soon && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                    <line x1="5" y1="15" x2="15" y2="5"/><polyline points="8,5 15,5 15,12"/>
                  </svg>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* How to Contribute */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">How to Contribute</h2>
        <div className="grid gap-4">
          <div className="glass p-6">
            <h3 className="text-base font-semibold mb-2">Report Issues</h3>
            <p className="text-sm font-light text-white/50 leading-relaxed">
              Found a bug or have a feature request? Open an issue on the relevant repository. We use GitHub issue templates to help you provide the right information.
            </p>
          </div>
          <div className="glass p-6">
            <h3 className="text-base font-semibold mb-2">Submit Pull Requests</h3>
            <p className="text-sm font-light text-white/50 leading-relaxed">
              All contributions must include a DCO sign-off. See <a href="https://github.com/justack-ai/website/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">CONTRIBUTING.md</a> for details on our process.
            </p>
          </div>
          <div className="glass p-6">
            <h3 className="text-base font-semibold mb-2">Join the Community</h3>
            <p className="text-sm font-light text-white/50 leading-relaxed">
              We are building community channels for developers, legal technologists, and anyone who wants to contribute to access-to-justice infrastructure. Sign up below to be notified when they launch.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">The Stack</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-6">
          justack.ai is built on a modern, composable stack designed for extensibility and privacy.
        </p>
        <div className="glass p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
            {[
              ["Frontend", "Next.js + React"],
              ["CMS", "Sanity"],
              ["Styling", "Tailwind CSS"],
              ["AI", "Claude + DeepSeek"],
              ["Hosting", "Vercel"],
              ["License", "Apache 2.0"],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="text-white/30 font-light text-xs tracking-[1px] uppercase block mb-0.5">{label}</span>
                <span className="text-white/70 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
    </main>
  );
}
