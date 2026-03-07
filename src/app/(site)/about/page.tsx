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

export const metadata: Metadata = {
  title: "About | justack.ai",
  description: "The story behind justack.ai — building open source legal help tools for the people the system forgot.",
};

export default function AboutPage() {
  return (
    <main className="max-w-[800px] mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">About</p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-6">The Story</h1>
        <p className="text-lg font-light text-white/50 leading-relaxed">
          justack.ai is an access-to-justice technology company building open source legal help tools.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Our Mission</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          Over 80% of Canadians facing legal problems cannot afford a lawyer. Legal aid has been hollowed out. Courts are overwhelmed. The people who need justice most are the people the system serves least.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          We believe technology can close the justice gap — not by replacing lawyers, but by reaching the people lawyers never reach. Every tool we build starts with the people the system forgot.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Approach */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Our Approach</h2>
        <div className="grid gap-8">
          {[
            { title: "Open Source by Default", desc: "Our core tools are open source under Apache 2.0. We believe access to justice infrastructure should be public goods." },
            { title: "The Dual Model", desc: "The commercial side funds the mission. The open-source side fulfils it. Commercial products for legal professionals generate the revenue that supports free tools for the public." },
            { title: "Regulatory Respect", desc: "We work with law societies, not around them. We are clear about the line between legal information and legal advice. We build tools that augment lawyers, not replace them." },
            { title: "Privacy by Design", desc: "Legal problems are among the most sensitive issues people face. Our tools are built with privacy as a foundational principle, not an afterthought." },
          ].map((item) => (
            <div key={item.title} className="glass p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm font-light text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Get in Touch</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-6">
          Whether you are a developer, lawyer, funder, or someone who believes in access to justice — we would love to hear from you.
        </p>
        <a
          href="mailto:hello@justack.ai"
          className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline"
        >
          hello@justack.ai
        </a>
      </section>
    </main>
  );
}
