/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Justack Foundation | justack.ai",
  description:
    "Justack Foundation is an Ontario not-for-profit corporation supporting research, education, and development on access-to-justice technology for public good.",
};

const pillars = [
  {
    title: "Research",
    body: "We support open research on how legal artificial intelligence actually serves the people the legal system structurally fails to reach. That includes evaluation benchmarks for access-to-justice tools, methodology papers on legal-AI safety in self-represented contexts, and applied studies on what works in front-line public legal services.",
  },
  {
    title: "Education",
    body: "We support public legal education and training that meets people where they are. That includes plain-language explainers, training materials for community legal workers, and curricula on the responsible use of AI in legal help — for non-lawyers and lawyers alike.",
  },
  {
    title: "Development",
    body: "We support the development of open-source legaltech infrastructure released under permissive licences, so that any access-to-justice initiative — public, private, or non-profit — can build on a shared base. The Foundation does not sell software; it strengthens the public commons that legal-aid programs, clinics, and self-help projects can draw from.",
  },
];

const directors = [
  {
    name: "David Valentin",
    title: "Director",
    body: "David Valentin is a pollster and strategist at Liaison Strategies. He contributes experience in public-opinion research and campaign strategy to the Foundation's research and education work.",
  },
  {
    name: "Paul Brookes",
    title: "Director",
    body: "Paul Brookes is President of Metropolis Media. He contributes experience in communications and media strategy to the Foundation's public-facing work.",
  },
  {
    name: "Alex Peel",
    title: "Director",
    body: "Alex Peel is Manager of Public Legal Education at Legal Aid BC. He contributes experience in public legal education and legal-aid service delivery to the Foundation's education and research work.",
  },
];

export default function FoundationPage() {
  return (
    <main className="max-w-[800px] mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">
          Not-for-profit
        </p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-6">
          Justack Foundation
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed">
          An Ontario not-for-profit corporation supporting research, education,
          and development on access-to-justice technology for public good.
        </p>
      </div>

      {/* Purpose */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Our Purpose
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          Most Canadians who face a legal problem do not get a lawyer. Legal aid
          is rationed. Courts are backlogged. The people who need justice most
          are the people the system serves least. Closing that gap will take
          more than law reform. It will take infrastructure — open, public,
          maintained over decades, and built specifically for the people the
          legal system has never reached.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          Justack Foundation exists to support the research, education, and
          development that build that infrastructure. The Foundation is the
          mission-aligned not-for-profit alongside the{" "}
          <Link
            href="/a2jai"
            className="text-[#a78bfa] underline underline-offset-2 decoration-[#a78bfa]/40 hover:decoration-[#a78bfa] hover:text-white transition-colors"
          >
            justack.ai
          </Link>{" "}
          access-to-justice platform — institutionally separate from the
          platform's commercial operator, with its own board, its own books, and
          its own public-interest mission.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Three pillars */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          What We Do
        </h2>
        <p className="text-sm font-light text-white/40 leading-relaxed mb-8">
          Three pillars — research, education, and development — all directed
          at access to justice and the public-good use of legal technology.
        </p>
        <div className="grid gap-8">
          {pillars.map((item) => (
            <div key={item.title} className="glass p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm font-light text-white/55 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Board of Directors */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Board of Directors
        </h2>
        <p className="text-sm font-light text-white/40 leading-relaxed mb-8">
          Three first directors, arm's-length from each other and from the
          Foundation's executive, providing independent governance for the
          Foundation's work as an Ontario not-for-profit corporation.
        </p>
        <div className="grid gap-8">
          {directors.map((d) => (
            <div key={d.name} className="glass p-6">
              <h3 className="text-lg font-semibold mb-1">{d.name}</h3>
              <p className="text-xs font-light tracking-[2px] uppercase text-white/40 mb-3">
                {d.title}
              </p>
              <p className="text-sm font-light text-white/55 leading-relaxed">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Executive Director */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Executive Director
        </h2>
        <p className="text-sm font-light text-white/40 leading-relaxed mb-8">
          Day-to-day leadership of the Foundation's research, education, and
          development work.
        </p>
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-1">Michael Bryant</h3>
          <p className="text-xs font-light tracking-[2px] uppercase text-white/40 mb-3">
            Executive Director
          </p>
          <p className="text-sm font-light text-white/55 leading-relaxed">
            Michael Bryant is the former Attorney General of Ontario
            (2003&ndash;2007) and former Minister of Aboriginal Affairs. He has
            served as Chief Executive Officer of the Canadian Civil Liberties
            Association and of Legal Aid BC, and he is the founder of the
            justack.ai access-to-justice platform. As Executive Director he is
            responsible to the board for the Foundation's research, education,
            and development programs. He does not sit on the board.
          </p>
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Status & Contact */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Status
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          Justack Foundation is incorporated as an Ontario not-for-profit
          corporation under the Ontario Not-for-Profit Corporations Act, with
          Ontario Corporation Number{" "}
          <span className="text-white/80">1001617779</span>. The Foundation
          intends to apply to the Canada Revenue Agency for registration as a
          charity. We are not yet a registered charity, and nothing on this
          page should be read as a representation of charitable status. If
          registered, the Foundation will publish its charitable registration
          number on this page.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          The Foundation does not currently solicit donations from the public.
          Peer organizations, prospective collaborators, and institutional
          contacts are welcome to get in touch.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Get in Touch
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-6">
          For institutional inquiries about research collaborations, education
          partnerships, or the Foundation's work.
        </p>
        <a
          href="mailto:foundation@justack.ai"
          className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline"
        >
          foundation@justack.ai
        </a>
      </section>
    </main>
  );
}
